import BookModels from  '../models/BookModels.mjs';
const createBook = async (req,res) => {
    const data = req.body;
    const books = await BookModels.create(data);
    const resp='Book Added Successfully';
    return res.status(201).send({Response:resp , message : books});
}
const findBooks=async (req,res)=>{
    const books=await BookModels.find();
    let message;
    if (books.length === 0) {
        message = "Apologies! No Books Found";
    } else {
        message = "Ohh yeah! Found the Book";
    }
    res.status(200).send({Response:message,Data:books});
}
export {createBook, findBooks};