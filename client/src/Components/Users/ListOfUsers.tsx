import React from "react";
import { GET_ALL_USERS } from "../../Graphql/User/Queries";
import { DELETE_USER } from "../../Graphql/User/Mutation";
import { useQuery, useMutation } from "@apollo/client";

function ListOfUsers() {
  const { data } = useQuery(GET_ALL_USERS);

  const [deleteUser, { error }] = useMutation(DELETE_USER);

  return (
    <div>
      <p>test tugas</p>
      {data &&
        data.getAllUsers.map((user: any) => {
          return (
            <div>
              {user.name} / {user.username}
              <button
                onClick={() => {
                  deleteUser({ variables: { id: user.id } });
                }}
              >
                Delete User
              </button>
            </div>
          );
        })}
    </div>
  );
}

export default ListOfUsers;
