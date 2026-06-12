from fastapi import APIRouter, HTTPException

from app.schemas import NewsletterForm, StatusResponse
from app.services import email

router = APIRouter(prefix="/api", tags=["newsletter"])


@router.post("/newsletter", response_model=StatusResponse)
def newsletter(form: NewsletterForm) -> StatusResponse:
    try:
        email.add_subscriber(form.email)
    except Exception:
        raise HTTPException(status_code=502, detail="Failed to subscribe.")
    return StatusResponse()
