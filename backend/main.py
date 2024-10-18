from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.app.api.routers import response
from backend.app.api.routers import outline


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
