import JobCard from "@/components/cards/job-card";
import { getUserFromCookies } from "@/helper";
import prismaClient from "@/services/prisma";

export default async function Page() {
  const user = await getUserFromCookies();

  if (!user) {
    return <div>user not found!</div>;
  }

  const application = await prismaClient.application.findMany({
    where: {
      userId: user.id,
    },
    include: {
      job: {
        include: {
          company: {
            include: {
              owner: true, // ✅ include owner so JobCard type matches
            },
          },
        },
      },
    },
  });

  if (!application.length) {
    return <div>NO application Found!!</div>;
  }

  return (
    <div>
      <div>
        <h1>Your Applications</h1>
      </div>
      {application.map((appl) => (
        <JobCard key={appl.id} job={appl.job} />
      ))}
    </div>
  );
}
