

from fastapi import FastAPI

from db import Contact, Job, session
from schemas import ContactCreate

app = FastAPI()


@app.get("/")
async def root():
    steven = Contact(job="IT", email="steven@stevenola.com")
    print(steven)
    session.add_all([steven])
    session.commit()
    return {"message": "Hello World"}

@app.get("/recover")
async def recover():
    contacts = session.query(Contact).all()
    for contact in contacts:
        print(contact)
    return {"contact": contacts.__name__}


@app.post("/contact/")
async def create_contact(contact: ContactCreate):
    contact = Contact(**contact.dict())
    session.add(contact)
    session.commit()
    return contact

@app.get("/contact/")
async def get_contacts():
    contacts = session.query(Contact).all()
    return contacts

@app.get("/contact/{contact_id}")
async def get_contact(contact_id: int):
    contact = session.query(Contact).filter(Contact.id == contact_id).first()
    return contact

@app.put("/contact/{contact_id}")
async def update_contact(contact_id: int, contact: ContactCreate):
    contact = session.query(Contact).filter(Contact.id == contact_id).first()
    for key, value in contact.dict().items():
        setattr(contact, key, value)
    session.commit()
    return contact

@app.delete("/contact/{contact_id}")
async def delete_contact(contact_id: int):
    contact = session.query(Contact).filter(Contact.id == contact_id).first()
    session.delete(contact)
    session.commit()
    return {"message": "Contact deleted successfully"}


@app.get("/job/")
async def get_jobs():
    jobs = session.query(Job).all()
    return jobs