from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routers import response, outline
from db.database import engine
from db import models

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(response.router)
app.include_router(outline.router)


@app.get("/")
def read_root():
    return {"message": "Welcome to Auto-Protocol Tool"}
