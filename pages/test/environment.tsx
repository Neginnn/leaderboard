import type { NextPage } from "next";
import { Meta } from "@/components/_common/Meta";

const TestEnvironmentPage: NextPage = () => {
  return (
    <>
      <Meta title="ENV TEST" noIndex />
      <div className="container" style={{ minHeight: "50vh" }}>
        <h2>NODE ENVIRONMENT:</h2>
        <p>{process.env.ENVIRONMENT}</p>
        <h2>APP ENVIRONMENT:</h2>
        <p>{process.env.APP_ENV}</p>
        <h2>SOA BASE URL:</h2>
        <p>{process.env.SOA_API_URL}</p>
        <h2>SEGMENT WRITE KEY:</h2>
        <p>{process.env.SEGMENT_WRITE_KEY}</p>
      </div>
      <style jsx>{`
        .container {
          padding: 0 3rem;
          min-height: 50vh;
        }
        h2 {
          font-size: 3rem;
        }
        p {
          margin: 0 0 1.5rem;
        }
      `}</style>
    </>
  );
};

export default TestEnvironmentPage;

export async function getServerSideProps() {
  const isProduction = process.env.APP_ENV === "prod";

  console.log("This is a test /w next-logger package. Can I see this?");

  if (isProduction) {
    return {
      redirect: {
        permanent: true,
        destination: "/",
      },
    };
  }

  return { props: {} };
}
