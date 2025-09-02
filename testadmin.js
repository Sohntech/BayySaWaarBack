import bcrypt from 'bcryptjs';
const password = 'adminPassword123'; // Remplace par le mot de passe souhaité
bcrypt.hash(password, 10, (err, hash) => {
  console.log(hash);
});
