-- AddForeignKey
ALTER TABLE "public1"."post" ADD CONSTRAINT "post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public1"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
