from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings loaded from environment / .env file."""

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    # Resend (https://resend.com)
    resend_api_key: str | None = None
    resend_from_email: str = "onboarding@resend.dev"
    resend_audience_id: str | None = None

    # Dev/testing: skip the real Resend call and report success.
    # Keep this false in production.
    resend_dry_run: bool = False

    # Where contact-form messages are delivered
    owner_email: str = "ngairaharon@gmail.com"

    # Allowed CORS origin (the Next.js frontend)
    frontend_origin: str = "http://localhost:3000"

    # Reserved for later — newsletter / content storage
    database_url: str | None = None


settings = Settings()
