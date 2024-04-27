import { PrismaClient } from '../prisma/generated/client'
import { getAllCVs, getCvById, createCv, updateCv, deleteCv } from './script';


const prisma = new PrismaClient()
 
export type GraphQLContext = {
  prisma: PrismaClient
  getAllCVs: typeof getAllCVs;
  getCvById: typeof getCvById;
  createCv: typeof createCv;
  updateCv: typeof updateCv;
  deleteCv: typeof deleteCv;
}
 

export async function createContext(): Promise<GraphQLContext> {
  return { prisma, getAllCVs, getCvById,createCv, updateCv, deleteCv }
}

