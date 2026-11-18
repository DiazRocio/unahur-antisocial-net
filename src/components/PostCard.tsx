import { Card, Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import type { Post } from '../types';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const authorName = typeof post.userId === 'object' && post.userId !== null
    ? (post.userId as any).nickName
    : 'Usuario';

  const formattedDate = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString('es-AR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
    : 'Reciente';

  return (
    <Card className="shadow-sm border rounded-4 bg-white overflow-hidden">
      <Card.Body className="d-flex align-items-center pb-2 pt-3 px-3">
        <div
          className="rounded-circle bg-dark text-white d-flex align-items-center justify-content-center fw-bold me-3 shadow-sm"
          style={{ width: '45px', height: '45px', fontSize: '1.1rem' }}
        >
          {authorName.charAt(0).toUpperCase()}
        </div>
        <div>
          <h6 className="mb-0 fw-bold text-dark">@{authorName}</h6>
          <small className="text-muted" style={{ fontSize: '0.8rem' }}>{formattedDate}</small>
        </div>
      </Card.Body>

      <Card.Body className="py-2 px-3">
        <Card.Text className="text-dark mb-3" style={{ whiteSpace: 'pre-line', fontSize: '1rem', lineHeight: '1.5' }}>
          {post.description}
        </Card.Text>

        {post.tags && post.tags.length > 0 && (
          <div className="mb-3 d-flex flex-wrap gap-1">
            {post.tags.map((tag: any, idx: number) => (
              <Badge
                key={tag._id || idx}
                bg="light"
                text="primary"
                className="border border-primary-subtle fw-normal px-2.5 py-1 rounded-pill"
                style={{ fontSize: '0.75rem' }}
              >
                #{tag.name || tag}
              </Badge>
            ))}
          </div>
        )}
      </Card.Body>

      {post.images && post.images.length > 0 && (
        <div className="d-flex flex-column gap-2 mt-3">
          {post.images.map((img: any, index: number) => (
            <img
              key={index}
              src={img.url}
              alt={`Imagen ${index + 1}`}
              className="w-100 rounded-3 object-fit-cover"
              style={{ maxHeight: '450px' }}
            />
          ))}
        </div>
      )}
      
      <div className="d-flex justify-content-between border-top pt-2 mt-3 text-muted" style={{ fontSize: '0.9rem' }}>
        <button className="btn btn-light btn-sm d-flex align-items-center gap-1 text-secondary border-0 bg-transparent">
          💬 Comentarios ({post.comments?.length || 0})
        </button>
        <button className="btn btn-light btn-sm d-flex align-items-center gap-1 text-secondary border-0 bg-transparent">
          ❤️ Me gusta
        </button>
        <button className="btn btn-light btn-sm d-flex align-items-center gap-1 text-secondary border-0 bg-transparent">
          ↗️ Compartir
        </button>
      </div>

      <Card.Footer className="bg-white border-top px-3 py-2 d-flex justify-content-end align-items-center">
        <Button
          as={Link as any}
          to={`/post/${post._id}`}
          variant="outline-dark"
          size="sm"
          className="rounded-pill px-4 fw-semibold"
          style={{ fontSize: '0.85rem' }}
        >
          Ver publicación
        </Button>
      </Card.Footer>
    </Card>
  );
}