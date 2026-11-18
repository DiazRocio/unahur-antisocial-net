import { useEffect, useState } from 'react';
import { Container, Card, Badge, Form, Button, Alert, Spinner, ListGroup } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostById, addComment } from '../services/api';
import { useAuth } from '../context/AuthContext';
import type { Post, Comment } from '../types';

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [commentContent, setCommentContent] = useState<string>('');
  const [submittingComment, setSubmittingComment] = useState<boolean>(false);

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPostDetail() {
      if (!id) return;
      try {
        const data = await getPostById(id);
        setPost(data);
      } catch (err) {
        setError('No se pudo cargar el detalle de la publicación.');
      } finally {
        setLoading(false);
      }
    }

    fetchPostDetail();
  }, [id]);

  const handleCommentSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!commentContent.trim() || !id || !user) return;

    setSubmittingComment(true);
    try {
      const newComment = await addComment(id, commentContent.trim(), user._id);
      
      const commentWithUser = {
        ...newComment,
        userId: user
      };

      setPost((prevPost) => {
        if (!prevPost) return null;
        return {
          ...prevPost,
          comments: [...(prevPost as any).comments || [], commentWithUser]
        };
      });

      setCommentContent('');
    } catch (err) {
      alert('Error al enviar el comentario.');
    } finally {
      setSubmittingComment(false);
    }
  };

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2 text-muted">Cargando publicación...</p>
      </Container>
    );
  }

  if (error || !post) {
    return (
      <Container className="py-4">
        <Alert variant="danger">{error || 'Publicación no encontrada.'}</Alert>
        <Button variant="secondary" onClick={() => navigate('/')}>Volver al Home</Button>
      </Container>
    );
  }

  return (
    <Container className="py-4" style={{ maxWidth: '800px' }}>
      <Button variant="outline-secondary" className="mb-3" onClick={() => navigate('/')}>
        ← Volver al Home
      </Button>

      <Card className="shadow-sm mb-4">
        {post.images && post.images.length > 0 && (
          <Card.Img
            variant="top"
            src={post.images[0].url}
            alt="Imagen de la publicación"
            style={{ maxHeight: '400px', objectFit: 'cover' }}
          />
        )}
        <Card.Body>
          <Card.Text className="fs-5 text-dark" style={{ whiteSpace: 'pre-wrap' }}>
            {post.description}
          </Card.Text>

          <div className="mb-3">
            {post.tags && Array.isArray(post.tags) && post.tags.map((tag, idx) => (
              <Badge bg="secondary" className="me-1" key={typeof tag === 'string' ? idx : tag._id}>
                #{typeof tag === 'string' ? tag : tag.name}
              </Badge>
            ))}
          </div>
        </Card.Body>
      </Card>

      <h3 className="mb-3 fw-bold">Comentarios</h3>

      {user ? (
        <Card className="mb-4 shadow-sm">
          <Card.Body>
            <Form onSubmit={handleCommentSubmit}>
              <Form.Group className="mb-3">
                <Form.Control
                  as="textarea"
                  rows={2}
                  placeholder="Escribí un comentario..."
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                />
              </Form.Group>
              <Button type="submit" variant="primary" disabled={submittingComment}>
                {submittingComment ? 'Enviando...' : 'Comentar'}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      ) : (
        <Alert variant="info" className="mb-4">
          Debes <Alert.Link href="/login">iniciar sesión</Alert.Link> para poder dejar un comentario.
        </Alert>
      )}

      <ListGroup className="shadow-sm">
        {(post as any).comments && (post as any).comments.length > 0 ? (
          (post as any).comments.map((comment: Comment) => (
            <ListGroup.Item key={comment._id} className="py-3">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <span className="fw-bold text-primary">
                  @{typeof comment.userId === 'object' && comment.userId !== null ? comment.userId.nickName : 'Usuario'}
                </span>
              </div>
              <p className="mb-0 text-dark">{comment.content}</p>
            </ListGroup.Item>
          ))
        ) : (
          <ListGroup.Item className="text-muted text-center py-3">
            No hay comentarios todavía. ¡Sé el primero en opinar!
          </ListGroup.Item>
        )}
      </ListGroup>
    </Container>
  );
}