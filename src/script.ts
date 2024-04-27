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

async function main() {
  /*const user= await createUser({ 
      id: "12345678",
      name: "John Doe",
      email: "john@example.com",
      role: "USER" 
  });

  const newCv = await createCv({
    id: "2",
    name: "John Doe",
    age: 30,
    job: "Software Engineer",
    userId: "12345678"
  });
*/

  //const updatedCv = await updateCv("2", {name : "Mohamed Ali"});

  console.log(await getAllCVs());
  console.log(await getCvWithSkillsAndUser("1"));

}

main()
  .finally(async () => {
    await prisma.$disconnect();
  });

export { getAllCVs, getCvById, createCv, updateCv, deleteCv };
