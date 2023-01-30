import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../../components/Header';

function HomePage() {
  const { data: user } = useSelector((state) => state.user);
  return (
    <div>
      <Header />
      HomePage
      {user && <p>Hello {user.firstName} {user.lastName}</p>}
    </div>
  );
}

export default HomePage;
