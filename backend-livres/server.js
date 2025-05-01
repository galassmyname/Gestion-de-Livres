require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import des routes
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');

const app = express();

// Middlewares
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));
app.use(express.json());

// Connexion MongoDB
mongoose.connect('mongodb://localhost:27017/livres', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connecté à MongoDB'))
.catch(err => console.error('❌ Erreur MongoDB:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

// Test route
app.get('/health', (req, res) => res.status(200).json({ status: 'OK' }));

// Gestion des erreurs
app.use((req, res) => res.status(404).json({ message: 'Route non trouvée' }));
app.use((err, req, res, next) => {
  console.error('🔥 Erreur:', err);
  res.status(500).json({ message: 'Erreur serveur' });
});

// Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur prêt sur http://localhost:${PORT}`);
});