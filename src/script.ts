import { PrismaClient } from '../prisma/generated/client'


const prisma = new PrismaClient();

async function getAllCVs() {
  return await prisma.cv.findMany();
}

async function getCvById(id: string) {
  return await prisma.cv.findUnique({
    where: {
      id: id
    },
    include: {
      skills: true,
      user: true
    }
  });
}

async function createCv(data: any) {
  return await prisma.cv.create({
    data: data
  });
}

async function updateCv(id: string, data: any) {
  return await prisma.cv.update({
    where: {
      id: id
    },
    data: data
  });
}

async function deleteCv(id: string) {
  return await prisma.cv.delete({
    where: {
      id: id
    }
  });
}

async function getCvWithSkillsAndUser(id: string) {
  return await prisma.cv.findUnique({
    where: {
      id: id
    },
    include: {
      skills: true,
      user: true
    }
  });
}

async function createUser(data: any) {
  return await prisma.user.create({
    data: data
  });
}


export { getAllCVs, getCvById, createCv, updateCv, deleteCv };
