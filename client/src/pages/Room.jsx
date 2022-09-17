import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { MainLayout } from "../HOC/MainLayout";
import { Button, Grid, Typography } from "@material-ui/core";
import { OneMessage } from "../components/OneMessage";
import SendIcon from "@material-ui/icons/Send";
import { Socket_Io } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { CreateNewMessage } from "../utils/createNewMessage";

import { type, nonType, newMessage, deleteRoom } from "../redux/actions/chatAction";

import { TYPING, NON_TYPING, NEW_MESSAGE, DELETE_ROOM } from "../redux/types";

import "../assets/css/room.css";

export default function Room() {
  const { Auth, Chat } = useSelector(state => state);
  const dispatch = useDispatch();
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const { roomId } = useParams();
  const inputRef = useRef();
  const JOIN_ROOM = "JOIN_ROOM";
  const click = "click";

  const handleChange = e => {
    setMessage(e.target.value);
    if (e.target.value.length > 0) {
      Socket_Io.emit(TYPING, {
        roomId,
        payload: Auth._id,
      });
    } else {
      Socket_Io.emit(NON_TYPING, {
        roomId,
        payload: Auth._id,
      });
    }
  };

  const handleSendMessage = typeClick => {
    const result = message.trim();
    if (typeClick === click || typeClick.keyCode === 13) {
      if (!result) {
        alert("message must not be empty");
        Socket_Io.emit(NON_TYPING, {
          roomId,
          payload: Auth._id,
        });
      } else {
        const msg = new CreateNewMessage(roomId, Auth._id, result);
        Socket_Io.emit(NEW_MESSAGE, msg);
        Socket_Io.emit(NON_TYPING, {
          roomId,
          payload: Auth._id,
        });
      }
      setMessage("");
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    setTimeout(() => {
      const displayMessages = document.getElementById("displayMessages");
      displayMessages.scrollTop = displayMessages.scrollHeight;
    }, 500);
  }, []);

  useEffect(() => {
    Socket_Io.on(TYPING, payload => {
      dispatch(type(TYPING, payload));
    });

    Socket_Io.on(NON_TYPING, payload => {
      dispatch(nonType(NON_TYPING, payload));
    });

    Socket_Io.on(NEW_MESSAGE, payload => {
      dispatch(newMessage(NEW_MESSAGE, payload));
    });
  }, []);

  useEffect(() => {
    inputRef.current.focus();
    inputRef.current.cols = 80;

    if (roomId) {
      Socket_Io.emit(JOIN_ROOM, roomId);
      setRoom(roomId);
    }

    return () => {
      setRoom("");
      dispatch(deleteRoom(DELETE_ROOM));
    };
  }, [roomId]);

  return (
    <MainLayout title={room}>
      <Grid container className="room" justifyContent="center">
        <Grid item md={5} xs={11} mx="auto" className="box-chat">
          <Grid className="display-messages" id="displayMessages">
            {Chat.messages
              .sort((a, b) => a.createdAt > b.createdAt)
              .map((item, i) => {
                return (
                  <OneMessage from={item.from} currentUser={Auth._id} content={item.content} id={item._id} key={i} />
                );
              })}

            {Chat.type.filter(item => item !== Auth._id)[0] && (
              <Typography variant="body2" className="typing">
                typing...
              </Typography>
            )}
          </Grid>
          <Grid className="input-message">
            <textarea
              placeholder="type message..."
              ref={inputRef}
              onChange={handleChange}
              onKeyUp={handleSendMessage}
              value={message}
            />

            <Button variant="contained" endIcon={<SendIcon />} onClick={() => handleSendMessage(click)}></Button>
          </Grid>
        </Grid>
      </Grid>
    </MainLayout>
  );
}
