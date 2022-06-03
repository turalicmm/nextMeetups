import React from "react";
import MeetupList from "../components/meetups/MeetupList";
import Head from "next/head";

import { MongoClient } from "mongodb";

const Welcome = (props) => {
  return (
    <div>
      <Head>
        <title>Next Meetups</title>
        <meta name="description" content="Browse all meetups"></meta>
      </Head>
      <MeetupList meetups={props.meetups} />
    </div>
  );
};

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export async function getStaticProps() {
  //fetch data
  const client = await MongoClient.connect("no creds for you");

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.data.title,
        address: meetup.data.address,
        image: meetup.data.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default Welcome;
