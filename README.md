## Note

For **Part 2**, I chose the **Employees** list as the target for the async-driven frontend enhancements, covering all three functional requirements: dynamic list loading, live search with debounce, and create/edit/delete without leaving the page.

Laravel Breeze was used as the authentication starter kit as required by Part 1. Although Breeze ships with Alpine.js by default, it was **not used** in the Part 2 implementation. All async behavior was built entirely in **vanilla JavaScript  organized across three modules — `api.js`, `ui.js`, and `employees.js` (the main entry module).


## Tech Stack
- **Backend:** Laravel 11, PHP, MySQL
- **Frontend:** Blade templates, Vanilla JavaScript (ES2020+)
- **Auth:** Laravel Breeze
- **Build Tool:** Vite (via Laravel Vite plugin)

### Setup
 
1. Clone the repository and navigate into the project folder:
```bash
cd employee-management-system
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

- You will be redirected to the dashboard at `/dashboard` for the employees table.
