import { dbOptions } from './connection';
import * as pg from "pg";

const { Client } = pg;

export const getProduct = async (productId) => {
    const client = new Client(dbOptions);
    await client.connect();
    let stock = {};

    const oneProductsQuery = `select id, title, price, image, count from products p
    inner join stocks s on p.id = s.product_id where p.id = '${productId}'`;

    try {
        const { rows: productsRows } = await client.query(oneProductsQuery);
        if (productsRows.length > 0) {
            stock = productsRows[0];
        }
    } catch(err) {
        console.error('Error during database request executing:', err);
    } finally {
        client.end();
    }

    return stock;
}

const createProductQuery = `insert into products (image, title, price) values ($1, $2, $3) returning id;`;
const addProductCountQuery = `insert into stocks (product_id, count) values ($1, $2);`;
export const createProduct = async (productData) => {
    console.log('Creating product in db...');
    const client = new Client(dbOptions);

    try {
        await client.connect();
        await client.query('BEGIN');
        const queryResult = await client.query(createProductQuery, [productData.image, productData.title, productData.price]);
        const productId = queryResult.rows[0].id;
        console.log('Create product query result', queryResult, 'product id', productId);
        await client.query(addProductCountQuery, [productId, productData.count]);
        await client.query('COMMIT');
    } catch(error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.end();
    }
}
