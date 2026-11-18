import { useEffect, useState } from 'react';
import { Container, Spinner, Alert, Card } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { getPosts } from '../services/api';
import PostCard from '../components/PostCard';
import type { Post } from '../types';

export default function Profile() {
  const { user } = useAuth();
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserPosts() {
      if (!user) return;
      try {
        const data = await getPosts();
        
        const filteredPosts = data.filter((post: any) => {
          const postAuthorId = typeof post.userId === 'object' && post.userId !== null
            ? post.userId._id
            : post.userId;

          return postAuthorId === user._id;
        });

        const sortedUserPosts = filteredPosts.sort((a: any, b: any) => {
          const dateA = new Date(a.createdAt || a.date || 0).getTime();
          const dateB = new Date(b.createdAt || b.date || 0).getTime();
          return dateB - dateA;
        });

        setUserPosts(sortedUserPosts);
      } catch (err) {
        setError('No se pudieron cargar tus publicaciones.');
      } finally {
        setLoading(false);
      }
    }

    fetchUserPosts();
  }, [user]);

  if (!user) {
    return null;
  }

  return (
    <Container className="py-4" style={{ maxWidth: '680px' }}>
      <Card className="shadow-sm border rounded-4 mb-4 text-center p-4 bg-white">
        <Card.Body className="p-0">
          <div
            className="rounded-circle bg-dark text-white d-flex align-items-center justify-content-center mx-auto mb-3 fw-bold shadow-sm"
            style={{ width: '80px', height: '80px', fontSize: '2rem' }}
          >
            {user.nickName.charAt(0).toUpperCase()}
          </div>
          <h3 className="fw-bold mb-1 text-dark">@{user.nickName}</h3>
          <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>Miembro de UnaHur Anti-Social Net</p>
        </Card.Body>
      </Card>

      <h5 className="mb-3 fw-bold text-secondary px-1">Mis Publicaciones</h5>

      {loading && (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2 text-muted">Cargando tus publicaciones...</p>
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && userPosts.length === 0 && (
        <Alert variant="info" className="rounded-4">
          Todavía no realizaste ninguna publicación. ¡Animate a crear la primera desde el menú superior!
        </Alert>
      )}

      <div className="d-flex flex-column gap-3">
        {userPosts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </Container>
  );
}