import { Company, Job, User } from "./generated/prisma";

export type JobWithCompany = Job & {
    company : Company
};


export type JobWithCompanyWithUser = Job & {
    company : Company & {
        owner : User
    }
}