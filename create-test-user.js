const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createTestUser() {
  try {
    // Check if user already exists
    const existing = await prisma.user.findUnique({
      where: { email: 'test@example.com' }
    });

    if (existing) {
      console.log('Test user already exists!');
      console.log('Email: test@example.com');
      console.log('Password: password123');
      await prisma.$disconnect();
      return;
    }

    // Create test user
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    const user = await prisma.user.create({
      data: {
        email: 'test@example.com',
        password: hashedPassword,
        name: 'Test User'
      }
    });

    console.log('✅ Test user created successfully!');
    console.log('');
    console.log('Logisn credentials:');
    console.log('  Email: test@example.com');
    console.log('  Password: password123');
    console.log('');
    console.log('You can now login at: http://localhost:3000/login');

    await prisma.$disconnect();
  } catch (error) {
    console.error('Error creating test user:', error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

createTestUser();
