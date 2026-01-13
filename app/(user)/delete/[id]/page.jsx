"use client";

import { deleteUser } from "../../../../helpers/users";
import { use, useEffect, useState } from "react";

const page = ({ params }) => {
  const { id } = use(params);

  const [loading, setLoading] = useState(true);

  const handleDeletion = async () => {
    await deleteUser(id);
    setTimeout(() => {
      setLoading(false);
      window.location.href = "/";
    }, 2000);
  };

  useEffect(() => {
    handleDeletion();
  }, []);

  return loading ? <div>Deleting...</div> : null;
};

export default page;
