from pydantic import BaseModel, EmailStr, Field


class ContactForm(BaseModel):
    name: str = Field(min_length=2, description="Sender's name")
    email: EmailStr
    message: str = Field(min_length=1)


class NewsletterForm(BaseModel):
    email: EmailStr


class StatusResponse(BaseModel):
    success: bool = True
