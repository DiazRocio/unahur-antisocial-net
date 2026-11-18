import type { User, Post, Tag, Comment } from '../types';

const API_URL = 'http://localhost:3000/api';

// ==========================
// USUARIOS (USERS)
// ==========================

export async function getUsers(): Promise<User[]> {
  try {
    const response = await fetch(`${API_URL}/users`);
    if (!response.ok) {
      throw new Error(`Error en el servidor: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw error;
  }
}

export async function createUser(nickName: string): Promise<User> {
  try {
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nickName }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'No se pudo crear el usuario');
    }
    return await response.json();
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    throw error;
  }
}

// ==========================
// PUBLICACIONES (POSTS)
// ==========================

export async function getPosts(userId?: string): Promise<Post[]> {
  try {
    let url = `${API_URL}/posts`;
    if (userId) {
      url += `?userId=${userId}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error al obtener publicaciones: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error al cargar posts:', error);
    throw error;
  }
}

export async function getPostById(id: string): Promise<Post> {
  try {
    const response = await fetch(`${API_URL}/posts/${id}`);
    if (!response.ok) {
      throw new Error(`Error al obtener el post: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error al cargar el detalle del post:', error);
    throw error;
  }
}

export async function createPost(postData: {
  description: string;
  userId: string;
  images?: { url: string }[];
  tags?: string[];
}): Promise<Post> {
  try {
    const response = await fetch(`${API_URL}/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error('Error al crear la publicación');
    }
    const data = await response.json();
    return data.post || data;
  } catch (error) {
    console.error('Error al crear post:', error);
    throw error;
  }
}

// ==========================
// COMENTARIOS (COMMENTS)
// ==========================

export async function addComment(postId: string, content: string, userId: string): Promise<Comment> {
  try {
    const response = await fetch(`${API_URL}/posts/${postId}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content, userId }),
    });

    if (!response.ok) {
      throw new Error('Error al enviar el comentario');
    }
    
    const data = await response.json();
    return data.comment || data;
  } catch (error) {
    console.error('Error al comentar:', error);
    throw error;
  }
}

// ==========================
// ETIQUETAS (TAGS)
// ==========================

export async function getTags(): Promise<Tag[]> {
  try {
    const response = await fetch(`${API_URL}/tags`);
    if (!response.ok) {
      throw new Error('Error al obtener las etiquetas');
    }
    return await response.json();
  } catch (error) {
    console.error('Error al cargar tags:', error);
    throw error;
  }
}

// ==========================
// ASOCIAR TAG A POST
// ==========================

export async function addTagToPost(postId: string, tagId: string): Promise<any> {
  try {
    const response = await fetch(`${API_URL}/posts/${postId}/tags/${tagId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error('Error al asociar la etiqueta');
    }
    return await response.json();
  } catch (error) {
    console.error('Error al asociar tag:', error);
    throw error;
  }
}