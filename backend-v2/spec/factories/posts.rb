FactoryBot.define do
  factory :post do
    title { "MyString" }
    description { "MyText" }
    content { "MyText" }
    cover_image { "MyString" }
    slug { "MyString" }
    views { 1 }
    status { "MyString" }
    tags { "MyString" }
  end
end
