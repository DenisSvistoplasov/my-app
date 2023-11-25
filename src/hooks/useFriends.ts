import { useEffect } from "react";
import { selectFriendsData, selectFriendsMeta, getFriends, addFriend, deleteFriend, editFriend } from "../store/friends";
import { useAppDispatch, useAppSelector } from "../store/store";
import { friendsAPI } from "../firebase/api";
import { IFormData } from "../types/formData";
import { IFriend } from "../types/friend";
import { createId } from "../utils/createId";

export function useFriends() {
  const dispatch = useAppDispatch();
  const friends = useAppSelector(selectFriendsData);
  const { isLoading } = useAppSelector(selectFriendsMeta);

  useEffect(() => {
    dispatch(getFriends());
  }, []);

  const create = (data: IFormData) => {
    const friend = {
      ...data,
      id: createId()
    };

    dispatch(addFriend(friend));
    friendsAPI.createFriend(friend);
  };

  const update = (friend: IFriend) => {
    dispatch(editFriend(friend));
    friendsAPI.editFriend(friend);
  };

  const remove = (id: string) => {
    dispatch(deleteFriend(id));
    friendsAPI.deleteFriend(id);
  };


  return {
    friends,
    isLoading,
    create,
    update,
    remove
  };
}