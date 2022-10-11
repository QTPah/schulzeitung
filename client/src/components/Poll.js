import React from 'react'

function Poll({ question, choises }) {

  const auth = useAuth();

  return (
    <>
      {auth.hasPermissions(perms) ? children : <h1>404</h1>}
    </>
  );
}

export default Poll;