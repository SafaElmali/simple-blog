module Api
  class TestController < ApplicationController
    # GET /api/test
    def index
      render json: { message: "API is working!" }
    end
  end
end
