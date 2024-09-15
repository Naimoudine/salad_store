CREATE TABLE employee (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP()
);

CREATE TABLE ingredient (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(255) NOT NULL,
  url VARCHAR(255) NOT NULL,
  category VARCHAR(255) NOT NULL,
  price INT NOT NULL,
  employee_id INT UNSIGNED,
  FOREIGN KEY (employee_id) REFERENCES employee(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP()
);

CREATE TABLE salad (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(255) NOT NULL,
  employee_id INT UNSIGNED NOT NULL,
  FOREIGN KEY (employee_id) REFERENCES employee(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP()
);

CREATE TABLE compose (
  ingredient_id INT UNSIGNED NOT NULL,
  salad_id INT UNSIGNED NOT NULL,
  FOREIGN KEY (salad_id) REFERENCES salad(id),
  FOREIGN KEY (ingredient_id) REFERENCES ingredient(id)
);

CREATE TABLE order_table (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  firstname VARCHAR(255) NOT NULL,
  lastname VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  phone_number VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP()
);

CREATE TABLE belongs (
  salad_id INT UNSIGNED NOT NULL,
  order_id INT UNSIGNED NOT NULL,
  FOREIGN KEY (salad_id) REFERENCES salad(id),
  FOREIGN KEY (order_id) REFERENCES order_table(id)
);

INSERT INTO employee (username, password)
VALUES
  ("salad restaurant", "$argon2i$v=19$m=16,t=2,p=1$a3kxRk1iM1dPQnNYUVZLTw$M7zmoRZ6Gk7vzAd9W2oE1w");

INSERT INTO ingredient (name, url, category, price) VALUES ("Laitue", "https://res.cloudinary.com/djccw5t9o/image/upload/v1726391188/salad_store/emiehjyzjhrxrc16dnva.png", "base", 1.5), ("Mâche", "https://res.cloudinary.com/djccw5t9o/image/upload/v1726391188/salad_store/n8xpg1bxgfhx15eycgqv.png", "base", 1.5), ("Pâte", "https://res.cloudinary.com/djccw5t9o/image/upload/v1726391188/salad_store/aqnsk0nzn26jkxkpdzao.png", "base", 1.5), ("Boulgour", "https://res.cloudinary.com/djccw5t9o/image/upload/v1726391188/salad_store/ftypswr5k2khfqynijcc.png", "base", 1.5), ("Quinoa", "https://res.cloudinary.com/djccw5t9o/image/upload/v1726391188/salad_store/pzm0yjln5z0tab7foakf.png", "base", 1.5), ("Riz", "https://res.cloudinary.com/djccw5t9o/image/upload/v1726391188/salad_store/h57dneqgxodimngytlhp.png", "base", 1.5),  ("Poulet", "https://res.cloudinary.com/djccw5t9o/image/upload/v1726391189/salad_store/k0xgje7ffblhcgpp4t6q.png", "protéine", 1.5), ("Thon", "https://res.cloudinary.com/djccw5t9o/image/upload/v1726391190/salad_store/g4o33u4ej5lgcuqkehqi.png", "protéine", 1.5), ("Oeuf", "https://res.cloudinary.com/djccw5t9o/image/upload/v1726391189/salad_store/uhuvqd8bnzdvexo2yjy0.png", "protéine", 1.5),  ("Jambon", "https://res.cloudinary.com/djccw5t9o/image/upload/v1726405579/salad_store/jqvo0ftgae5kf0ycihw3.png", "protéine", 1.5), ("Saumon", "https://res.cloudinary.com/djccw5t9o/image/upload/v1726391189/salad_store/s05sxjftdydfhq85snwn.png", "protéine", 1.5), ("Crevette", "https://res.cloudinary.com/djccw5t9o/image/upload/v1726405816/salad_store/aag2xdxbwiilxn6v7wqr.png", "protéine", 1.5), ("Feta", "https://res.cloudinary.com/djccw5t9o/image/upload/v1726391188/salad_store/wxhci6lhb60abwqi6bz2.png", "frommage", 1.5),  ("Mozzarella", "https://res.cloudinary.com/djccw5t9o/image/upload/v1726391189/salad_store/dqf1r6kh3sxrzptw8ds7.png", "frommage", 1.5), ("Gorgonzola", "https://res.cloudinary.com/djccw5t9o/image/upload/v1726391189/salad_store/eyxiffkma9hn2q77we0r.png", "frommage", 1.5), ("Emmental", "https://res.cloudinary.com/djccw5t9o/image/upload/v1726391189/salad_store/emsr6rckobiwupl19liw.png", "frommage", 1.5), ("Parmesan", "https://res.cloudinary.com/djccw5t9o/image/upload/v1726391189/salad_store/rxhy90xqm6jems7fayzv.png", "frommage", 1.5), ("Cheddar", "https://res.cloudinary.com/djccw5t9o/image/upload/v1726406221/salad_store/mztbfogro19hs46d8ser.png", "frommage", 1.5), ("Carotte Rapée", "https://res.cloudinary.com/djccw5t9o/image/upload/v1726391189/salad_store/m8tvwv0atbap3yhznrvv.png", "topping", 1.5), ("Champignon", "https://res.cloudinary.com/djccw5t9o/image/upload/v1726391190/salad_store/Champignons.png", "topping", 1.5), ("Maïs", "https://res.cloudinary.com/djccw5t9o/image/upload/v1726391190/salad_store/gqzqqidql0qrosdtb6pb.png", "topping", 1.5), ("Croûtons", "https://res.cloudinary.com/djccw5t9o/image/upload/v1726391190/salad_store/g52tqgxwv1dkicpviuva.webp", "topping", 1.5), ("Tomate cerise", "https://res.cloudinary.com/djccw5t9o/image/upload/v1726391190/salad_store/gzaislxbadeclizryutn.png", "topping", 1.5), ("Olive", "https://res.cloudinary.com/djccw5t9o/image/upload/v1726391190/salad_store/f4lyounche4u4pfrrxd4.png", "topping", 1.5);


