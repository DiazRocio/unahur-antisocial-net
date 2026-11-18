import React, { useEffect, useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { createPost, getTags, addTagToPost } from '../services/api';
import { useAuth } from '../context/AuthContext';
import type { Tag } from '../types';

export default function CreatePost() {
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const [availableTags, setAvailableTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [loadingTags, setLoadingTags] = useState<boolean>(true);

  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTags() {
      try {
        const tagsData = await getTags();
        setAvailableTags(tagsData);
      } catch (err) {
        console.error('Error al cargar las etiquetas', err);
      } finally {
        setLoadingTags(false);
      }
    }
    fetchTags();
  }, []);

  const handleTagToggle = (tagId: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]
    );
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setError(null);

    if (!description.trim()) {
      setError('La descripción de la publicación es obligatoria.');
      return;
    }

    if (!user) {
      setError('Debes iniciar sesión para crear una publicación.');
      return;
    }

    setSubmitting(true);

    try {
      const postPayload: any = {
        description: description.trim(),
        userId: user._id,
      };

      if (imageUrl.trim()) {
        postPayload.images = [{ url: imageUrl.trim() }];
      }

      const newPost = await createPost(postPayload);
      console.log('Post creado con éxito:', newPost);
      const postId = newPost._id;

      if (selectedTags.length > 0 && postId) {
        for (const tagId of selectedTags) {
          try {
            console.log(`Asociando tag ID: ${tagId} al post ID: ${postId}`);
            const tagRes = await addTagToPost(postId, tagId);
            console.log('Resultado asociación tag:', tagRes);
          } catch (tagError) {
            console.error(`Fallo al asociar el tag ${tagId}:`, tagError);
          }
        }
      }

      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Error al crear la publicación.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className="py-5" style={{ maxWidth: '600px' }}>
      <Card className="shadow p-4">
        <Card.Body>
          <h2 className="text-center mb-4 fw-bold">Crear Nueva Publicación</h2>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Descripción *</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="¿Qué estás pensando o debatiendo?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formImageUrl">
              <Form.Label>URL de Imagen (Opcional)</Form.Label>
              <Form.Control
                type="url"
                placeholder="https://picsum.photos/600/400"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
              <Form.Text className="text-muted">
                Pega un enlace directo que termine en imagen.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">Etiquetas disponibles</Form.Label>
              {loadingTags ? (
                <div className="text-muted small">Cargando etiquetas...</div>
              ) : availableTags.length > 0 ? (
                <div className="d-flex flex-wrap gap-2 border p-3 rounded bg-light">
                  {availableTags.map((tag) => (
                    <Form.Check
                      type="checkbox"
                      id={`tag-${tag._id}`}
                      key={tag._id}
                      label={`#${tag.name}`}
                      checked={selectedTags.includes(tag._id)}
                      onChange={() => handleTagToggle(tag._id)}
                      className="me-3"
                    />
                  ))}
                </div>
              ) : (
                <div className="text-muted small">No hay etiquetas creadas en el sistema todavía.</div>
              )}
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-100"
              disabled={submitting}
            >
              {submitting ? 'Publicando...' : 'Publicar'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}