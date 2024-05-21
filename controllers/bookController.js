
const { body, validationResult } = require('express-validator');
const Book = require('../models/Book');
const {imageUploader,imageDelete}=require("../helpers/cloudinary");
const {redisClient}=require("../helpers/redis")
const path=require("path");
class Books{
    /**
     * @desc Get all books with auther
     * @route GET /books/
     * @access Protected (Requires authentication token)
     */
    static async getBooks (req, res) {
        try {
          const query=req.query;
          let books=await Book.find();
          res.json(books);
        } catch (error) {
          res.status(500).json({ message: 'Server error', error:error.message });
        }
      }
      /**
      * @desc Get all books with auther
      * @route GET /books/
      * @access Protected (Requires authentication token)
      */
    static async getBookById(req,res){
      try {
        if(await Book.findById(req.params.id)){
          const book = await Book.findById(req.params.id);
          res.status(200).json(book);
        }
        else{
          res.status(500).json({message:'No Book Present!'});
        }
        
      } catch (error) {
        res.status(500).send({error:error.message});
      }
    }
    /**
      * @desc Get books with search
      * @route GET /books?
      * @access Protected (Requires authentication token)
      */
    static async searchBook(req,res){
      try {
        let query=req.query;
        let books=await Book.find(query);
        res.status(200).json(books);
        
      } catch (error) {
        res.status(500).send({error:error.message});
      }
    }

      /**
     * @desc Add book with role 
     * @route POST /
     * @access Protected (Requires authentication token)
     */
    static async addBooks (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
    
        try {
          const data = JSON.parse(req.body.info);
          let folder='Books';
          const coverPage=await imageUploader(req.file.path,folder)
          if(!coverPage){
            return res.send("coverPage is required");
          }
          data.title=data.title.toLowerCase();
          data.author=data.title.toLowerCase();
          const book = new Book({
            title:data.title,
            author:data.author,
            coverPage,
            year:data.year,
          });
    
          const createdBook = await book.save();
          res.status(200).json({message:'New book added',book:createdBook});
        } catch (error) {
          res.status(500).json({ message: 'Server error', error:error.message });
        }
      }
    
      /**
     * @desc Update book
     * @route PUT /update
     * @access Protected (Requires authentication token)
     */

    static async updateBook (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
    
        try {
          const book = req.body;
          if (req.file) {
            book.coverPage =await imageUploader(req.file.path);
          }
          for(let key in book){
            book[key]=book[key].toLowerCase();
          }
          if(await Book.findById(req.params.id)){
            const updatedBook = await Book.findByIdAndUpdate(req.params.id,book);
            res.status(200).json({message:'Book Updated!'});
          }
          else{
            res.status(500).json({message:'No Book Present!'});
          }
        } catch (error) {
          res.status(500).json({ message: 'Server error', error });
        }
      }

      /**
     * @desc delete book  
     * @route DELETE /remove
     * @access Protected (Requires authentication token)
     */
      static async deleteBook (req, res) {
        try {
          let image='';
          let result='';
          if(await Book.findById(req.params.id)){
            const book = await Book.findById(req.params.id);
            let publicId=book.coverPage.split("/");
            publicId=publicId[publicId.length-1].split(".")[0];
            image=await imageDelete(`books/${publicId}`);
            result=await Book.findByIdAndDelete(req.params.id);
          }
          else{
            res.status(500).json({message:'No Book Present!'});
          }

          if(image&&result){
            res.status(200).json({ message: 'Book removed' });
          }
          
        } catch (error) {
          res.status(500).json({ message: 'Server error', error:error.message });
        }
      }
}

module.exports=Books;