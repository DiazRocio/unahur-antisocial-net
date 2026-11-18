import { useEffect, useState } from 'react';
import { Container, Spinner, Alert } from 'react-bootstrap';
import { getPosts } from '../services/api';
import PostCard from '../components/PostCard';
import logoAntiSocial from '../assets/ANTI-SOCIALNET.jpeg';
import type { Post } from '../types';

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await getPosts();

        const sortedPosts = data.sort((a: any, b: any) => {
          const dateA = new Date(a.createdAt || a.date || 0).getTime();
          const dateB = new Date(b.createdAt || b.date || 0).getTime();
          return dateB - dateA;
        });

        setPosts(sortedPosts);
      } catch (err) {
        setError('No se pudieron cargar las publicaciones del servidor.');
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  return (
    <div className="pb-5">
      <Container style={{ maxWidth: '900px' }} className="pt-4 mb-4">
        <div className="p-5 bg-white border rounded-4 shadow-sm text-center position-relative overflow-hidden">
          <div
            className="position-absolute top-0 start-0 w-100"
            style={{ height: '6px', background: 'linear-gradient(90deg, #1d9bf0, #8ecdf8)' }}
          ></div>

          <img
            src={logoAntiSocial}
            alt="UnaHur Anti-Social Net Logo"
            width="75"
            height="75"
            className="rounded-circle mb-3 shadow object-fit-cover mt-2"
          />
          <h1 className="fw-bold text-dark mb-2" style={{ fontSize: '1.75rem' }}>
            UnaHur Anti-Social Net
          </h1>
          <p className="text-muted mb-0 mx-auto" style={{ fontSize: '0.95rem', maxWidth: '450px' }}>
            La red social oficial para conectar, compartir y debatir con la comunidad.
          </p>
        </div>
      </Container>

      <Container style={{ maxWidth: '680px' }}>
        <h5 className="mb-3 fw-bold text-secondary px-1">Feed Principal</h5>

        {loading && (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-2 text-muted">Cargando publicaciones...</p>
          </div>
        )}

        {error && <Alert variant="danger">{error}</Alert>}

        {!loading && !error && posts.length === 0 && (
          <Alert variant="info">No hay publicaciones disponibles todavía. ¡Sé el primero en crear una!</Alert>
        )}

        <div className="d-flex flex-column gap-3">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </Container>
    </div>
  );
}