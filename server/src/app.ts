import express, { type Request, type Response } from "express";
const app = express();

app.get("/api/v1/test", (req: Request, res: Response) => {
console.log(hello("12"));

  
  res.send("server running fine very fine i love this ");
});

app.listen(4000);

function hello(str:string){
  return `hello ${str}`
}