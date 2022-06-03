import React from "react";
import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

import Head from "next/head";
const NewMeetup = () => {
  const router = useRouter();
  const addMeetup = async (enteredData) => {
    const res = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    console.log(data);
    router.push("/");
  };
  return (
    <div>
      <Head>
        <title>Next Meetups</title>
        <meta
          name="description"
          content="Host your meetup and make new friends!"
        ></meta>
      </Head>
      <NewMeetupForm onAddMeetup={addMeetup} />
    </div>
  );
};

export default NewMeetup;
