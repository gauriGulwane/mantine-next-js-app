'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Text, Avatar, Button } from '@mantine/core';
import {
  IconPhone,
  IconMail,
  IconGlobe,
  IconTrash,
  IconUserMinus,
  IconUserPlus,
  IconStar,
} from '@tabler/icons-react';

const IndexPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/users'
        );
        setUsers(
          response.data
            .slice(0, 10)
            .map((user) => ({ ...user, isFollowed: false }))
        );
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const generateAvatarUrl = (name) => {
    const encodedName = encodeURIComponent(name);
    return `https://api.dicebear.com/7.x/initials/svg?seed=${encodedName}`;
  };

  const handleFollow = (id) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, isFollowed: !user.isFollowed } : user
      )
    );
  };

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(285px, 1fr))',
          gap: '20px',
          marginTop: '20px',
        }}
      >
        {users.map((user) => (
          <Card
            key={user.id}
            shadow='lg'
            style={{
              padding: '20px',
              textAlign: 'left',
              position: 'relative',
              border: '1px solid #f0f0f0',
              borderRadius: '15px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '10px',
              }}
            >
              <Avatar
                src={generateAvatarUrl(user.name)}
                alt={user.name}
                size={120}
                style={{ borderRadius: '50%' }}
              />
            </div>
            <Text
              variant='h6'
              style={{
                textAlign: 'center',
                marginBottom: '10px',
                fontWeight: 'bold',
              }}
            >
              {user.name}
              {user.isFollowed && (
                <IconStar
                  size={15}
                  style={{ marginLeft: '5px', color: 'black' }}
                />
              )}
            </Text>
            <div>
              <Text style={{ color: 'grey' }}>
                <IconMail /> {user.email}
              </Text>
              <Text style={{ color: 'grey' }}>
                <IconPhone /> {user.phone}
              </Text>
              <Text style={{ color: 'grey', marginBottom: '15px' }}>
                <IconGlobe /> {user.website}
              </Text>
            </div>
            <div style={{ textAlign: 'center' }}>
              {user.isFollowed ? (
                <Button
                  variant='outline'
                  color='red'
                  onClick={() => handleFollow(user.id)}
                  size='sm'
                >
                  <IconUserMinus />
                  Unfollow
                </Button>
              ) : (
                <Button
                  variant='outline'
                  onClick={() => handleFollow(user.id)}
                  size='sm'
                >
                  <IconUserPlus />
                  Follow
                </Button>
              )}
              <Button
                variant='outline'
                color='red'
                style={{ marginLeft: '10px' }}
                onClick={() => handleDelete(user.id)}
                size='sm'
              >
                <IconTrash />
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default IndexPage;
