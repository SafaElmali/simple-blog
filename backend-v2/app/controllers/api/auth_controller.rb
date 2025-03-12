module Api
  class AuthController < BaseController
    skip_before_action :authenticate_user!, only: [:register, :login, :create_first_admin]
    
    # POST /api/auth/register
    def register
      user = User.new(user_params)
      
      if user.save
        render json: user, status: :created
      else
        render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
      end
    end
    
    # POST /api/auth/login
    def login
      user = User.find_by(email: params[:email])
      
      if user&.valid_password?(params[:password])
        token = JWT.encode(
          { user_id: user.id, exp: 24.hours.from_now.to_i },
          Rails.application.credentials.secret_key_base
        )
        
        render json: { 
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role
          },
          token: token
        }
      else
        render json: { error: 'Invalid email or password' }, status: :unauthorized
      end
    end
    
    # POST /api/auth/admin/create-first
    def create_first_admin
      # Only allow if no admin exists
      if User.where(role: :admin).exists?
        return render json: { error: 'Admin already exists' }, status: :forbidden
      end
      
      admin = User.new(user_params)
      admin.role = :admin
      
      if admin.save
        render json: admin, status: :created
      else
        render json: { errors: admin.errors.full_messages }, status: :unprocessable_entity
      end
    end
    
    # POST /api/auth/admin
    def create_admin
      admin_only!
      
      admin = User.new(user_params)
      admin.role = :admin
      
      if admin.save
        render json: admin, status: :created
      else
        render json: { errors: admin.errors.full_messages }, status: :unprocessable_entity
      end
    end
    
    private
    
    def user_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation)
    end
  end
end
