DROP DATABASE IF EXISTS laundrydb;
CREATE DATABASE laundrydb;

USE laundrydb;

CREATE TABLE Invoice (
	 id INT NOT NULL AUTO_INCREMENT,
	 invoice_number VARCHAR(255) NOT NULL,
	 total DOUBLE NOT NULL,
	 currency VARCHAR(255) NOT NULL,
	 invoice_date DATE NOT NULL,
	 due_date DATE NOT NULL,
	 vendor_name VARCHAR(255) NOT NULL,
	 remittance_address VARCHAR(255) NOT NULL,
	 status VARCHAR(255) NOT NULL DEFAULT 'Pending',
	 PRIMARY KEY (id)
 );


INSERT INTO Invoice VALUES
(1, '12345', 199.99, 'USD', '2019-08-17', '2019-09-21', 'Acme Cleaners Inc.', '123 ABC St. Charlotte, NC 28209', 'Pending'),
(2, '34565', 399.99, 'PEN', '2019-08-11', '2019-09-15', 'BBC Cleaners Inc.', '234  St. Manuel, NC 28209', 'Pending'),
(3, '65432', 899.99, 'EUR', '2019-08-27', '2019-09-30', 'Clean Cleaners Inc.', '98  St. Joan, NC 28209', 'Pending'),
(4, '56789', 599.99, 'YEN', '2019-08-03', '2019-09-17', 'D Cleaners Inc.', '987 ABC St. Max, NC 28209', 'Pending'),
(5, '23456', 299.99, 'COL', '2019-08-20', '2019-09-22', 'Innn Cleaners Inc.', '123 Dolores Av ', 'Pending');