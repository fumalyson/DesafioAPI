import express from 'express'
import { createConnection } from "typeorm";
import { pagination } from 'typeorm-pagination'

createConnection().then(() => {
    
    console.log('Succesfully connected with database')
}
)

