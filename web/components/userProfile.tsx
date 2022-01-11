import React, { MouseEventHandler, useState } from "react";
import { delete_, post } from "../common/api";
import { UserData } from "../common/types";
import { Button } from "./button";
import { FollowButton, FollowButtonEventHandler } from "./followButton";
import { UserName } from "./userName";

interface IUserProfileProps {
  user: UserData;
  following: boolean;
  followed: boolean;
}

export const UserProfile: React.FC<IUserProfileProps> = ({
  user,
  following,
  followed,
}) => {
  const [followState, setFollowState] = useState(following);

  const handleFollow: FollowButtonEventHandler = async (_evt) => {
    const uri = `/follow/${user.id}`;
    const resp = await post(uri);
    const { success } = await resp.json();

    if (success) {
      setFollowState(true);
    }
  };

  const handleFollowing: FollowButtonEventHandler = async (_evt) => {
    const sure = confirm(`${user.name} さんのフォローを外しますか？`);
    if (!sure) {
      return;
    }

    const uri = `/follow/${user.id}`;
    const resp = await delete_(uri);
    const { success } = await resp.json();

    if (success) {
      setFollowState(false);
    }
  };

  const followedText = followed ? <p>あなたをフォローしています</p> : null;

  return (
    <React.Fragment>
      <h3>
        <UserName {...{ user }} />
      </h3>
      <div>
        <FollowButton
          following={followState}
          onClickFollowing={handleFollowing}
          onClickNotFollowing={handleFollow}
        />
      </div>
      {followedText}
    </React.Fragment>
  );
};