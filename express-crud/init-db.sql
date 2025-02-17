CREATE DATABASE notes_db;
CREATE TABLE IF NOT EXISTS notes
(
    "id"   UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL UNIQUE,
    "date" DATE         NOT NULL,
    "desc" TEXT         NOT NULL
);
INSERT INTO notes ("name", "date", "desc")
VALUES ('Reunión con el equipo',
        '2023-11-20',
        'Discutir los avances del proyecto'),
       ('Llamada con el cliente',
        '2023-11-21',
        'Presentar la propuesta de diseño'),
       ('Revisión de código',
        '2023-11-22',
        'Revisar el nuevo módulo implementado'),
       ('Entrega de informe',
        '2023-11-23',
        'Entregar el informe de progreso semanal'),
       ('Planificación del sprint',
        '2023-11-24',
        'Planificar las tareas para el próximo sprint');
