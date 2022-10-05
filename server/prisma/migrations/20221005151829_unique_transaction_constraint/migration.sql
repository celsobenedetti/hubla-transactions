/*
  Warnings:

  - A unique constraint covering the columns `[product_id,vendor_id,date]` on the table `transactions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "transactions_product_id_vendor_id_date_key" ON "transactions"("product_id", "vendor_id", "date");
