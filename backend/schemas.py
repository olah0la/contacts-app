from pydantic import BaseModel

class Job(BaseModel):
    name: str

class ContactSchema(BaseModel):

    first_name: str | None 
    last_name: str | None
    job: str
    email: str
    address: str | None
    comment: str | None

class ContactOut(ContactSchema):
    id: int