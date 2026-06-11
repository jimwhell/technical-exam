### Setup
 
1. Clone the repository and navigate into the project folder:
```bash
cd server
```
 
2. Install dependencies:
```bash
composer install
npm install
```
 
3. Copy the environment file and configure your database:
```bash
cp .env.example .env
php artisan key:generate
```
 
4. Run migrations:
```bash
php artisan migrate --seed
```
 
### Running the App
 
In one terminal, start the Vite dev server:
 
```bash
npm run dev
```
 
In another terminal, start the Laravel server:
 
```bash
php artisan serve
```
 
### Accessing the App
 
Go to [http://localhost:8000/login](http://localhost:8000/login) and log in with:
 
- **Email:** admin@admin.com
- **Password:** password
You will be redirected to the dashboard at `/dashboard` for the employees table.
