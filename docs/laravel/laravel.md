---
sidebar_position: 1
---

# Laravel PHP Framework

### Setting up & Command Lines

```php
// refer to the respective documentation for installation instructions
// install composer
// install laravel
// install node js

// on project directory
// commands:
node -v                                     - check if node is installed
npm -v                                      - check if npm is installed
composer                                    - check if composer is installed
composer global require laravel/installer   - install laravel globally
laravel                                     - check if laravel is installed
laravel new [app name]                      - create new laravel app
php artisan                                 - list all artisan commands
php artisan serve                           - create new server for laravel app

//  setting up frontend scaffolding using laravel ui
composer require laravel/ui

//  using default authentication scaffolding
php artisan ui:auth

//  using bootstrap as a frontend scaffolding
//  using vue as a frontend scaffolding
php artisan ui vue

//  using react as a frontend scaffolding
php artisan ui react

//  building the frontend / with js and node packages
//  install npm
npm install

//  compile npm
//  need to compile npm before you can use it
//  run twice until successful compilation
//  need to run to compile changes in css, js and sass resources
npm run dev

//  compile packages automatically upon saving
npm run watch

//  using sass in laravel
//  in webpack.mix.js put this code
//  then run command 'npm run dev' to compile
<script> mix.sass('resources/sass/app.scss', 'public/css'); </script>

//  caching and optimization commands
//  optimize the autoloading
composer dump-autoload -o

//  cache the laravel routes (very important on slower servers)
php artisan route:cache
php artisan api:cache

//  cache the core laravel configurations (including service providers, etc.)
composer clear-cache
php artisan config:cache
php artisan clear-compiled

//  one line optimizer
php artisan optimize

//  removing the cache
php artisan route:clear
php artisan cache:clear
php artisan config:clear

//  installing debugbar
composer require barryvdh/laravel-debugbar --dev

```

### Common Conventions

```php
// creating routes
POST api/articles App\Http\Controllers\ArticleController@store
GET api/articles/{id} App\Http\Controllers\ArticleController@show
GET api/articles App\Http\Controllers\ArticleController@index
PUT api/articles/{id} App\Http\Controllers\ArticleController@store
DELETE api/articles/{id} App\Http\Controllers\ArticleController@destroy

// naming routes
Route::get('/articles', 'ArticleController@index')->name('articles.index');
Route::resource('users', UserController::class);

// creating controller
php artisan make:controller PageController

// creating model
php artisan make:model Article

// creating migrations
php artisan make:migration create_articles_table
php artisan make:migration add_author_column_to_articles_table
php artisan make:migration change_author_length_in_articles_table
php artisan make:migration rename_author_in_articles_table

// creating views
function show($uid) {
    return view('profiles.show')->with('key', $user);
}

// creating seeders
php artisan make:seeder PostSeeder

// creating factory
php artisan make:factory PostFactory

// creating components
php artisan make:component Sidebar

// casing in components attributes should be camel case in constructor arguments, then kebab-case as a html attributes
class Sidebar extends Component
{
    public $alertType;

    public function __construct($alertType)
    {
        $this->alertType =$alertType;
    }
}

<x-component title="this is a sample data" :alert-type="$var"/>

// creating an export class
php artisan make:export UserExport --model=User

// creating an import class
php artisan make:import UserImport --model=User

// creating users import route and controller
Route::get('/users/import', [UserImportController::class, 'show']);

```

### Web & API Routing

```php
// in creating routes for controller refer to the documentation:
// https://laravel.com/docs/6.x/controllers#resource-controllers
// methods inside controllers are called 'action'
Route::[http method]('/uri/{params}', 'function or controller@action')->name('route name');

Route::get('/', function () {
    return view('welcome');  // data you want to return (if an array was returned it will automatically converted into json format)
});

// querying parameter from the url
url: /user?name='john'

Route::get('/user', function () {
    $var = request('name');

    return view('welcome', ['key' => $var]);
});

// passing variable from routes to view
Route::get('/', function () {
    $arr = ['key' => 'value'];

    return view('welcome', $arr);
});

// passing variable/wildcard into routes to view
Route::get('/articles/{uid}', function ($uid) {
    return view('article', ['var' => $uid]);
});

Route::get('/articles/{uid}/{name}', function ($uid, $name) {
    return view('article', [
        'var' => $uid,
        'name' => $name
    ]);
});

// sample of proper convention:
verb : 'get',
uri : '/articles',
action : 'index',
route name: 'articles.index'

Route::get('/articles', 'ArticleController@index')->name('articles.index');

// passing variable into routes/url to controller
Route::get('/profiles/{uid}', 'ProfileController@show')->name('profiles.show');

// registering route in laravel 8 version new syntax
// declare your controller namespace
use App\Http\Controllers\HomeController;

// method 1: using php callable syntax
Route::get('/', [HomeController::class, 'index']);

// method 2: using string syntax
Route::get('/', 'App\Http\Controllers\HomeController@index');

// This single route declaration creates multiple routes to handle a variety of actions on the resource.
// The generated controller will already have methods stubbed for each of these actions,
// including notes informing you of the HTTP verbs and URIs they handle.
Route::resources([
    'articles' => 'ArticleController',
]);

You may register many resource controllers at once by passing an array to the resources method:

Route::resources([
    'photos' => 'PhotoController',
    'posts' => 'PostController'
]);

// registering many resources with laravel 8 version new syntax
Route::resource('users', UserController::class);

// custom route name
Route::resource('pages', PageController::class)->names([
    'create' => 'pages.build'
]);


// method 1. check if user is currently login and authenticated (only one route will be protected)
Route::get('/articles', 'ArticleController@index')->name('articles.index')->middleware('auth');

// disable registration in laravel ui auth scafollding
Auth::routes([
    'register' => false
]);


// routes are rank on preference
// re-order your route to avoid parameter collision
Route::get('/post/create', 'PostController@create'); // this route will be read first literally and check if it exists
Route::get('/post/{id}', 'PostController@index'); // will be read if previous routes does not exists

// you can also add constraint on your parameter with the use of conditions
// here we use regular expressions put constraint on the parameter
Route::get('/post/{id}', 'PostController@index')->where('id', '[0-9]+');

// passing multiple constraints
Route::get('user/{id}/{name}', 'PostController@index')->where(array('id' => '[0-9]+', 'name' => '[a-z]+'));

// declare global constraint, helpful for routes created using resources
Route::pattern('id', '[0-9]+');


// using catch-all route regex to accept parameters with slashes
Route::get('locations/export/{parameter?}', [LocationController::class, 'customFunction'])->where(['parameter' => '(.*)']);

// accept any variable value using regular expressions
Route::get('/{any}', [PageController::class, 'index'])->where('any', '.*');

// route grouping
// group routes base on api versions
// in this case the endpoint will be: api/v1/skills
Route::group(['prefix' => 'v1'], function() {
    Route::apiResource('skills', SkillController::class);
});

```

### Controllers

```php
// controller directory - the controllers, controller files
laravelapp/app/Http/Controllers

// creating a controller
php artisan help make:controller //- show information/options about the command
php artisan make:controller [options] [controller name] //- create a new controller class

// different methods of passing data from controller to view
// code in UserProfileController.php :
use App\User; // import model so you can interact with its data from the database
use App\Models\User; // new model path in laravel 8 version

class UserProfileController extends Controller
{
    public function show($uid) {

    	// dd(User::find($user));

    	$user = User::find($uid);

        // method 1: passing data as array
    	return view('profiles.show', [
    		'key' => $user
        ]);

        // method 2: using the 'compact' method
        // syntax: compact('variable name or array of variables');
        return view('profiles.show', compact('user'));
        // or
        return view('pages.index', compact(['variable1', 'variable2']));

        // method 3: using the 'with' method in passing a variable
        return view('profiles.show')->with('key', $user);
    }
}


// passing data returned from a method
class PageController extends Controller
{
    public function index() {
        return view('pages.index')->with('list', $this->list());
    }

    public function list() {
        return [
            ['name' => 'John', 'age' => '20'],
            ['name' => 'Peter', 'age' => '22'],
            ['name' => 'Mary', 'age' => '23']
        ];
    }
}


// locating a file inside a directory
// example: create.blade file inside a posts folder inside views directory
// you can use a period or a slash
return view('posts.create');
return view('posts/create');


use App\User; // import model so you can interact with its data from the database
use App\Models\User; // new model path in laravel 8 version

class UserProfileController extends Controller
{
    // method 2. check if user is currently login and authenticated (all route will be protected)
    public function __construct() {
        $this->middleware('auth');

        // make an exception by giving the except array of methods you dont want to include for authentication
        $this->middleware('auth', ['except' => ['index', 'show']]);
    }

    public function show($uid) {

    	$user = User::find($uid);

    	return view('profiles.show', [
    		'key' => $user
    	]);
    }
}
```

### Views & Templating with Blade

```php
// views directory - the view, html/frontend layout
// laravelapp/resources/views

// code in a blade file :
// output data from controller
// the double curly braces escapes special characters

<p>string: {{ $key }}</p>
<p>username: {{ $obj->username }}</p>

// extend component
// file path of the parent component you want to extend
@extends('layouts.app')

@section('content')

<form action="/p" enctype="multipart/form-data" method="post">
// insert fields here
</form>

@endsection

// one line content
syntax: @section('key', 'value')
@section('title', 'App Title')

// code in parent component:
// yield is use to call the extended child component
@yield('content')
// passing a default value if a section is undefined
@yield('content', View::make('view.name'))

// appending element into the parent layout
// code in parent.blade.php
// using the b:section-show
@section('sidebar')

<p>this is the main content</p>
@show

// code in child.blade.php
// utilizing the @parent directive to append (rather than overwriting)
// content to the layout's sidebar
@section('sidebar')
	@parent

    <p>this is the appended element</p>

@endsection

// conditional operator
@if ()
@elseif ()
@else
@endif

// unless is use if a condition became false
@unless ()
@endunless
```

// switch statement
@switch($i)
@case(1)
@break
@case(2)
@break
@default
@endswitch

```php
// do something if a section has content
@hasSection ('title')
@yield('title') //- App Name
@else
// App Name
@endif

// do something if a section does not have a content
@sectionMissing('navigation')
@include('default-navigation')
@endif

// using vanilla php inside blade
@php
// vanilla php code here
@endphp

// loops
// for loop
@for ($i = 0; $i < 5; $i++)

<p>The value of i is {{ $i }}</p>
@endfor

// foreach loop
// check the loop docs for more properties: https://laravel.com/docs/8.x/blade#the-loop-variable
@foreach ($items as $item)
// $loop is an object with functions you can use inside a loop

        $loop->index //- get index of array
        $loop->first //- indicate if first in a loop
        $loop->last //- indicate if last in a loop

    {{ $loop->index }} {{ $item['key'] }}

@endforeach

// foreach loop with validation if variable is not empty
@forelse ($users as $user)

<li>{{ $user->name }}</li>
@empty
<p>No users</p>
@endforelse

```

```php
// while loop
@while (true)
<p>I'm looping forever.</p>
@endwhile
```

```php
// break and continue
@foreach ($users as $user)
    @if ($user->type == 1)
@continue
@endif

    <li>{{ $user->name }}</li>

    @if ($user->number == 5)
        @break
    @endif

@endforeach

// shorthand for break and continue
@foreach ($users as $user)
    @continue($user->type == 1)

    <li>{{ $user->name }}</li>

    @break($user->number == 5)

@endforeach

// csrf protection

<meta name="csrf-token" content="{{ csrf_token() }}">
<script>window.Laravel = { csrfToken: '{{ csrf_token() }}' }</script>

// linking external files (css / js)
// css directory
laravelapp/public/css

// no need to indicate the 'public' folder

<link rel="stylesheet" href="/css/style.css">

// or using the asset function
// asset method is the directory of the public folder

<link rel="stylesheet" href="{{ asset('css/app.css') }}">

// note:
// always after changing css, js or sass in resource folder
// run the command 'npm run dev' to compile the resources into the public folder

// creating dynamic app title
// in .env file change the value of app name:
APP_NAME="Laravel App"

// declaring html language

<html lang="{{ app()->getLocale() }}"></html>

// in blade page header use the config method
// config('object', 'default value')
{{ config('app.name', 'Default App Name') }}

// @csrf - prevent cross-site forgery

<form action="/p" enctype="multipart/form-data" method="post">
    @csrf
     insert fields here
</form>

// accessing a session data from a submitted form
// this is the data bound with 'with()' method during redirect
@if (session('key'))

<p>{{ session('key') }}</p>
@endif

// overiding the form method

<form action="/p" enctype="multipart/form-data" method="post">
    @csrf
    @method('DELETE')
    //  insert fields here
</form>

// creating a path to refer to specific route
// syntax: route('route name');
<a href="{{ route('articles.index') }}"></a>

// passing parameter to specific route
<a href="{{ route('articles.index', $id) }}"></a>

// include a file
@include('inc.navbar')

// include a file with data
@include('view.name', ['some' => 'data'])

// include if a view file exists
@includeIf('view.name', ['some' => 'data'])

// include if a condition has been met
// given boolean should be evaluated to true
@includeWhen($boolean, 'view.name', ['some' => 'data'])

// given boolean should be evaluated to false
@includeUnless($boolean, 'view.name', ['some' => 'data'])

// aliasing include and passing data to the file
// code in the AppServiceProvider on boot method:
// syntax: Blade::include('view file', 'alias');

Blade::include('includes.input', 'input');

// render and pass data
@input(['type' => 'email'])

// output error using the error variable from form
// method 1: iterate all error
@if (count($errors) > 0)
    <ul>
        @foreach ($errors->all() as $error)

<li>{{ $error }}</li>
@endforeach
</ul>
@endif

// method 2: output error of specific field
@if ($errors->has('form_field'))

<p>{{ $errors->first('form_field') }}</p>
@endif

// output error using the @error directive
// use the $message variable within the directive to output the message
@error('form_field')
{{ $message }}
@enderror

```

```php
// bind a class in a field if there is an error
// method 1:
// using directives
<input id="title" name="title" type="text" class="@error('title') is-invalid @enderror">
// method 2:
// the old fuction will retain the previous value of the input
<input type="text" name="title" class="{{ $errors->has('title') ? 'is-invalid' : '' }}" value="{{ old('title') }}">

// functions that can be call inside blade echo
// unix timestamp
{{ time() }}

// validate variable using @isset and @empty directives
@isset($records)
// $records is defined and is not null
@endisset

@empty($records)
// $records is "empty"
@endempty
```

```php
<!-- ternary operator -->
<!-- here we check if a variable is set -->
{{ isset($name) ? $name : 'Default' }}

{{ $name or 'Default' }}

<!-- unscaping entities -->
{!! $name !!}

<!-- converting value into a json string -->

<script>
    var app = @json($array, JSON_PRETTY_PRINT);
</script>

<!-- checking if user is authenticated or guest -->
@auth('admin')
@auth
// The user is authenticated
@endauth

@guest('admin')
@guest
// The user is not authenticated
@endguest

// or using the Auth class if user is guest or not
@if (Auth::guest())
@endif

// getting the data of the current login user
{{ Auth::user()->id }}

// pushing scripts in a stack
// code in index.blade.php
@stack('scripts')

// push the script you want to include in the stack
@push('scripts')

<script></script>

@endpush

// load the script only once
@once
@push('scripts')

<script></script>

@endpush
@endonce

// prepend content in the beginning of the stack
@prepend('scripts')

<script></script>

@endprepend
```

### View Components

```php
// creating components
php artisan make:component [component name]

// convention is PascalCase
php artisan make:component Sidebar

// class component directory
laravelapp/app/View/Components

// view component directory
laravelapp/resources/views/components

// invoking your component
<x-component-name/>

// if component is nested in subdirectory you can use the dot(.) notation to locate the component
<x-folder.component-name/>

// passing data into the component
// using html attributes
<x-component title="this is a sample data"/>

// then accept the attribute in the component class constructor

class Sidebar extends Component
{
public $title;

    public function __construct($title)
    {
        $this->title = $title;
    }

}

// echo the data using blade echo
{{ $title }}

// passing data from the outside source
// use : syntax in the attribute

$data = 'this is a data from outside source';
<x-component title="this is a sample data" :info="$var"/>

// casing
// attributes should be camel case in constructor arguments,
// then kebab-case as a html attributes

class Sidebar extends Component
{
public $alertType;

    public function __construct($alertType)
    {
        $this->alertType =$alertType;
    }

}

<x-component title="this is a sample data" :alert-type="$var"/>

// public method in the component class can be invoke as a variable in the view component

class Sidebar extends Component
{
public function greet() {
return 'Greetings!';
}
}

// code in view component

<p>{{ $greet }}</p>

// passing data as a parameter to the method

class Sidebar extends Component
{
public function greet($name) {
        return 'Greetings!,'.$name;
}
}

// code in view component

<p>{{ $greet('John') }}</p>

// slots
// slots use for declaring children inside the component
// code in component view
<x-component>

<p>This is the children element</p>
</x-component>

// calling the slots with the $slot variable
{{ $slot }}

// named slots
// call name slots as a variable
<x-component>
	<x-slot name="title">This is the children element</x-slot>
</x-component>

{{ $title }}

```

### Database Migrations

```php
// migration directory - migration files, where you can modify to create your database structure
laravelapp/database/migrations

// configure database
go to .env file

// creating a migration
php artisan make:migration [options] [migration name]

// follow proper naming convention (creating table)
php artisan make:migration create_articles_table

// migrate migration:
// ctrl + c - exit then serve the server again
php artisan migrate // - migrate all migrations to the latest state

// whenever you make changes to your database
// you need to remake your database
// note: will lose all data in database
php artisan migrate:fresh // - deleting everything and making everything again basically refreshing your database

// database migration structure
// available column type : https://laravel.com/docs/6.x/migrations#creating-columns

$table->bigIncrements('id');

// available column modifiers: https://laravel.com/docs/6.x/migrations#column-modifiers

$table->string('name')->nullable();

class CreateProfilesTable extends Migration
{
// this method runs when we migrate the database
public function up()
{
Schema::create('profiles', function (Blueprint $table) {
$table->bigIncrements('id');
$table->string('name')->nullable();
$table->timestamps();
});
}

    // this method runs when we rollback the database
    public function down()
    {
        Schema::dropIfExists('posts');
    }

}

// adding column without deleting database data
// 1. create another migration file
// 2. naming convention (adding column): add*(column name)\_to*(table name)\_table
// 3. add columns to the newly generated migration file
// 4. migrate the migrations

php artisan make:migration add_author_to_articles_table

class AddAuthorToArticlesTable extends Migration
{
	public function up()
	{
		Schema::table('articles', function (Blueprint $table) {
			// add new column here
		});
	}
}

// modifying columns
// before modifying a column, be sure to add the doctrine/dbal dependency to your composer.json file.
composer require doctrine/dbal

// modify columns
// in this example: change the column length
// note: run php artisan migrate command in every changes you made in migrations
php artisan make:migration change*[column name]\_length_in*[table name]\_table

function up()
{
	Schema::table('table_name', function (Blueprint $table) {
		$table->string('column_name', 50)->change();
	});
}

// renaming column
// note: run php artisan migrate command in every changes you made in migrations
php artisan make:migration rename*[column_name]\_in*[table name]\_table

function up()
{
	Schema::table('table_name', function (Blueprint $table) {
		$table->renameColumn('from', 'to');
	});
}

// dropping a column

function up()
{
	Schema::table('users', function (Blueprint $table) {
		$table->dropColumn('column_name');

        // dropping multiple column
        $table->dropColumn(['column_name', 'column_name1', 'column_name2']);
    });
}

// migrations options
migrate:fresh // - drops all tables and re-run all migrations
migrate:install // - create the migration repository
migrate:refresh // - reset and re-run all migrations, but will not drop tables
migrate:reset // - rollback all database migrations, removing tables but will not re-run the migrations
migrate:rollback // - rollback the last database migration, rollback another time to roll the previous batch
migrate:status // - show the status of each migration

// removing a migration file
// 1. run migrate:rollback
// 2. delete the migration file
// 3. reset composer autoload files: composer dump-autoload
// 4. delete migration entry on migrations table

composer dump-autoload

// indexing
// available index types
$table->primary('id');	// Adds a primary key.
$table->primary(['id', 'parent_id']); // Adds composite keys.
$table->unique('email');	// Adds a unique index.
$table->index('state'); // Adds a plain index.
$table->spatialIndex('location'); // Adds a spatial index. (except SQLite)

// indexing a column
function up()
{
	Schema::table('users', function (Blueprint $table) {
		$table->index('user_id');

		// index multiple column
		$table->index(['account_id', 'created_at']);
	});
}

// rollback specific migration file
php artisan migrate:rollback --path=[migration path]
php artisan migrate:rollback --path=\database\migrations\2020_11_22_022907_add_province_column_in_addresses_table.php

// drops all tables and re-run specific migration file
php artisan migrate:fresh --path=[migration path]
php artisan migrate:fresh --path=\database\migrations\2014_10_12_000000_create_users_table.php

// refresh specific migration file
// this will not delete or drop other table data
php artisan migrate:refresh --path=[migration path]
php artisan migrate:refresh --path=\database\migrations\2014_10_12_000000_create_users_table.php
```

### Seeds & Factories

```php
// GENERATING DATA USING FACTORIES
// factories help to generate sample data for database
// creating a factory:
// name convention: PascalCase ([TableName]Factory)
php artisan make:factory [factory name] --model=[model name]
php artisan make:factory PostFactory --model=Post

// factory directory:
database/factories/

// make sure that Illuminate\Database\Eloquent\Factories\HasFactory
// trait is imported in your model
// code in: Post.php

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
	use HasFactory;
}

// creation definition using the faker library instance
// list of faker formatters: https://fakerphp.github.io/formatters/
// code in: PostFactory.php
function definition()
{
	return [
		'title' => $this->faker->sentence,
		'body' => $this->faker->paragraph
	];
}

// generating the faker data using tinker (laravel version 8)
// make a single instance
Post::factory()->make();

// make multiple instance
Post::factory()->count(3)->make();

// use create method to persist data to the database:
// create single instance
Post::factory()->create();

// create multiple instance
// method 1:
Post::factory()->count(3)->create();

// method 2:
Post::factory()->times(3)->create();

// GENERATING DATA USING SEEDERS
// creating a seeder class
php artisan make:seeder [seeder name]

// seeder directory:
database/seeders/

// code in seeder class
function run()
{
	DB::disableQueryLog(); // disable query log when seeding to optimize performance
	Post::factory()->create(); // run a model factory to create data into the database
}

// default seeder class: DatabaseSeeder
// code in DatabaseSeeder.php
function run()
{
	// method 1:
	// run a model factory
	User::factory(10)->create();

    // method 2:
    // using the call method in root "DatabaseSeeder" class to run multiple factory instance
    // helpful if you want to see the seeding speed
    $this->call([
        UserSeeder::class
    ]);
}

// running the seeder
// php artisan db:seed
// or specifying a class to be run
php artisan db:seed --class=[seeder class name]

// using one file database seeder to generate dummy data
// import DB and faker services
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;
```

```php
class DatabaseSeeder extends Seeder
{
	public function run()
	{
		$faker = Faker::create();

        $gender = $faker->randomElement(['male', 'female']); // generate random value using the given array values

    	foreach (range(1,200) as $index) {
            DB::table('students')->insert([
                'name' => $faker->name($gender),
                'email' => $faker->email,
                'username' => $faker->username,
                'phone' => $faker->phoneNumber,
                'dob' => $faker->date($format = 'Y-m-d', $max = 'now')
            ]);
        }
    }
}

// faster seeding using array chunks
class DatabaseSeeder extends Seeder
{
	public function run()
	{
		$data = [];
		$faker = Faker::create();

        for ($i = 0; $i < 50000; $i++) {
            $data[]  = [
                'location_name' => $faker->title,
                'created_at' => now()->toDateTimeString(),
                'updated_at' => now()->toDateTimeString()
            ];
        }

        $chunks = array_chunk($data, 5000);

        foreach ($chunks as $chunk) {
            Location::insert($chunk);
        }
    }
}

// seeding table with a foreign key of another table
// code in factory file
function definition()
{
	// user_id field is a foreign key
	return [
		// METHOD 1, with factory
		'user_id' => function() {
			return User::factory()->create()->id;
		},

        // METHOD 2, with data in database
        'user_id' => User::all()->random()->id,
    ];
}

// generating random data with faker
function definition()
{
	return [
		'email' => $this->faker->unique()->safeEmail, // generate random unique email
		'code' => $this->faker->randomNumber(5, true), // generate code with specific length params: (max amount of digits, return only amount of digits)
		'id' => $this->faker->randomDigitNot(0), // random digit except a number
		'order' => $this->faker->randomDigit(), // random digit between 0-9
		'remember_token' => Str::random(10), // generate random string with specified length
		'created_at' => Carbon::now()->subMonth(rand(1, 12)) // generate random months using Carbon api
	];
}

```

### Models

```php
// model directory - sample model class for User, one model class represents one row in database
laravelapp/app/Models/User.php

// creating a model
php artisan make:model // - create a new Eloquent model class
php artisan make:model [model name] -m // - 'm' means the model will also create a migration file as soon as it is created

// interacting to your app through commandline using tinker
// useful in debugging
php artisan tinker // - useful in debugging your app
User::all(); // - using the User model fetching all user data in user table
exit // - close the tinker

// instanciating a class
$profile = new \App\Profile();

// assigning value
$profile->name = 'Nice Name';

// saving the data
$profile->save();

// dump the object
$profile;

// push changes into the database
$user->profile->url = 'sampleurl.org';
$user->push();

// truncate database using the model class
App\Models\Profile::truncate();

class Profile extends Model
{
	// default table depends on the given name of the model
	protected $table = 'table_name'; // connect this model in different table

    // specify the primary key of the table
    protected $primarykey = 'column_id';

    // specify the timestamps
    public $timestamps = true;

    // disable mass assignment protection
    protected $guarded = [];

    // allow mass assignment
    protected $fillable = [
        'column_name'
    ];

    // casting data types
    // casting data into certain data types then convert it vice versa e.g. array -> json, json-> array
    protected $casts = [
        'column_name' => 'data_type',
        'permissions' => 'array' // here we take the data from the permissions column then cast it into array
    ];

    // note: you can refer to the documenation for more options
    // https://laravel.com/docs/8.x/eloquent#defining-models

}

```

### Model Relationships

```php
// table relationship
// one to one relationship
// in this example the Profile belongs to one User and a User has one Profile
class Profile extends Model
{
	public function user() {
		return $this->belongsTo(User::class);
	}
}

// you can then access the user data of the profile
$profile = Profile::find(1);
$profile->user()->get();
$profile->user->name;

// reversely one User has one Profile
class User extends Authenticatable
{
	public function profile() {
		return $this->hasOne(Profile::class);
	}
}

// one to many relationship
// in this example a Post belongs to one User and a User has many post
// a post belongs to one user
class Post extends Model
{
	public function user() {
		return $this->belongsTo(User::class);
	}
}

// reversely one User has many posts
class User extends Authenticatable
{
	// observe singular and plural naming convention
	public function posts() {
		return $this->hasMany(Post::class);
	}
}

// restructuring the migration file for foreign key constraints
public function up()
{
	Schema::create('posts', function (Blueprint $table) {
		$table->id();
		$table->unsignedBigInteger('user_id'); // needed to store foreign key
		$table->string('title');
		$table->text('body');
		$table->foreign('user_id')->references('id')->on('users'); // check value in 'user_id' foreign key exists in table 'users' in column 'id'
		$table->foreign('user_id')->references('id')->on('users')->onDelete('cascade'); // delete all posts when the owner user is deleted
		$table->timestamps();
	});
}

// many to many relationship
// in this example we have a post that is categorized in many cantegories
// a post can belong to many category
class Post extends Model
{
	public function categories() {
		return $this->belongsToMany(Category::class);
	}
}

// and a category can belong to many posts

class Category extends Model
{
	public function posts() {
		return $this->belongsToMany(Post::class);
	}
}

// restructuring migration
// in this case you need to create a pivot table (like a bridge) to connect each post to category vice versa
// pivot table name rule: TWO TABLE NAME IN SINGULAR, ORDERED ALPHABETICALLY, SEPARATED BY UNDERSCORE
public function up()
{
	Schema::create('category_post', function (Blueprint $table) {
		$table->unsignedBigInteger('category_id');
		$table->unsignedBigInteger('post_id');
        $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');
        $table->foreign('post_id')->references('id')->on('posts')->onDelete('cascade');
    });
}
```

### Validations

```php
// validation of form fields
// list of validation rules: https://laravel.com/docs/8.x/validation#available-validation-rules

use App\User; // import model so you can interact with its data from the database
use App\Models\User; // new model path in laravel 8 version

class UserProfileController extends Controller
{
	public function store(Request $request) {
        $this->validate($request, [
            'title' => 'required',
            'body' => 'required'
        ]);

        return 'ok';
    }
}

// validation rules may be specified as arrays of rules instead of a single | delimited string:
function store(Request $request) {
    $this->validate($request, [
        'title' => ['required', 'unique:posts', 'max:255'],
        'body' => ['required'],
    ]);

    return 'ok';
}

// creating a form request validation
php artisan make:request [request name]

// form request directory:
app/Http/Request

// code in form request file:
// put the validation rules in the rules method
function rules()
{
	return [
		'title' => 'required',
		'body' => 'required',
		'thumbnail' => 'image|nullable|max:1999',
		'location' => ['regex:/^[0-9\pL\s\_-]+$/u'] // allowed characters
	];
}

// customize validation messages in messages method
function messages()
{
	return [
		// syntax: 'field.rule' => 'custom message'
		'title.required' => 'The title field is required'
	];
}

// code in controller file
// put the request class as a dependency injection
use App\Http\Requests\PostRequest;
use Illuminate\Validation\Rule;

function store(PostRequest $request) {
	$request->validated();
    // insert code here
}

// list of validation rules
function rules()
{
	return [
		'title' => 'required', // required field
		'thumbnail' => 'image|nullable|max:1999', // file must be an image, can be null, max size limit
		'location' => ['regex:/^[0-9\pL\s\_-]+$/u'], // allow letters, numbers, underscores, dashes and spaces
		'sss_number' => ['required','regex:/^\d{2}-\d{7}-\d{1}$/'], // regex for number format e.g. 12-1234567-9
		'email' => ['unique:users,email'], // 'unique:[table name],[field name]'
		'department_code' => ['unique:departments,department_code,'.$id], // forcing the unique rule to ignore a given id
		'company_id' => ['required', Rule::notIn(['null'])], // field must not have a value of 'null'
	];
}

// throwing custom exceptions as a response
use Illuminate\Validation\ValidationException;

throw ValidationException::withMessages([
	'username' => ['The provided credentials are incorrect.']
]);

// throwing exceptions with status code
abort(401, 'unauthorized');

// custom validation
// check if position is already assigned into the employee
use Illuminate\Support\Facades\Validator;

Validator::extend('duplicate_position', function ($attribute, $value, $parameters, $validator) {
	$prefix_id = $parameters[0];
	$id_number = $parameters[1];

    $employee = DB::table('employee_positions')
        ->leftJoin('employees', 'employee_positions.employee_id', '=', 'employees.id')
        ->where('employees.prefix_id', $prefix_id)
        ->where('employees.id_number', $id_number)
        ->get();

    return ($employee->count()) ? 1 : 0;
});

$rules = [
	'position_name' => ['duplicate_position:prefix_id,id_number']
];
```

### API / Resources

```php
// creating standard json api format: https://jsonapi.org/
// guide in creating json api format with laravel resources:

// -   https://medium.com/zero-equals-false/using-laravel-5-5-resources-to-create-your-own-json-api-formatted-api-2c6af5e4d0e8
// -   https://github.com/developerdino/example-articles-api

// create api routes
// api directory: routes/api.php

Route::get('articles', [ArticleController::class, 'index']);
Route::get('articles/{id}', [ArticleController::class, 'show']);
Route::post('articles', [ArticleController::class, 'store']);
Route::put('articles/{id}', [ArticleController::class, 'update']);
Route::delete('articles/{id}', [ArticleController::class, 'destroy']);

// create an api resource
// directory: app/Http/Resources/
php artisan make:resource Article

// code in article resource
app/Http/Resources/Article.php

class Article extends JsonResource
{
	public function toArray($request)
    {
        return parent::toArray($request);

        // modifying the returned resource
        return [
            'id' => $this->id,
            'title' => $this->title,
            'body' => $this->body
        ];
    }

    // appending additional data using with method
    public function with($request) {
        return [
            'version' => '1.0.0',
            'url' => 'http://url-sample.com'
        ];
    }
}

// api crud operation in controller file
use App\Http\Resources\Article as ArticleResources;

class ArticleController extends Controller
{
	// get data
	public function index()
	{
		// get data
		// $articles = Article::paginate(15);
        $articles = DB::table('articles')->select(['id', 'title', 'body'])->orderBy('created_at', 'desc')->paginate(15);
        // $articles = collect($articles);

        // return collection of data as a resource
        // use collection if you are returning a list of items
        return ArticleResources::collection($articles);
        // return response()->json($articles);
    }

    // create data
    public function store(Request $request)
    {
        // isMethod() - check the method of a request
        // required an id field if it is a put request else create new if it is a post
        // $article = $request->isMethod('put') ? Article::findOrFail($request->article_id) : new Article();
        $article = new Article();

        // $article->id = $request->input('article_id');
        $article->title = $request->input('title');
        $article->body = $request->input('body');

        // return the updated or newly added article
        if ($article->save()) {
            return new ArticleResources($article);
        }
    }

    public function update(Request $request, $id)
    {
        $article = Article::findOrFail($id);

        $article->title = $request->input('title');
        $article->body = $request->input('body');

        // return the updated or newly added article
        if ($article->save()) {
            return new ArticleResources($article);
        }
    }

    // get single data
    public function show($id)
    {
        // get the article
        $article = Article::findOrFail($id);

        // return a single article as a resource
        return new ArticleResources($article);
    }

    // delete a data
    public function destroy($id)
    {
        // get the article
        $article = Article::findOrFail($id);

        // return the deleted article as a resource
        if ($article->delete()) {
            return new ArticleResources($article);
        }
    }
}

// remove the "data" wrapping from the response
// edit the file in app/Providers/AppServiceProvider.php
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\ServiceProvider;

function boot() {
	JsonResource::withoutWrapping();
}

// prefixing api
// useful if you create different version of your api
// code in api route file
Route::prefix('v1')->group(function() {
	Route::apiResource('posts', 'PostController');
});
```

### Dates & Time

```php
// using carbon for timestamps
$c = new Carbon\Carbon('now -1 day 4 hours');

dump($c->diffForHumans());
dump($c->shortRelativeDiffForHumans());

// output:
// "20 hours ago"
// "20h ago"

// using carbon to insert timestamp with db query builder
DB::table('table')->insert([
	'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
	'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
]);

// format timestamps
$created = Carbon::createFromFormat('Y-m-d H:i:s', $this->created_at)->format('M d, Y H:i');

// uisng carbon in faker
function definition()
{
	return [
		'created_at' => Carbon::now()->subMonth(rand(1, 12)) // generate random months using Carbon api
	];
}

// generate random date and time with faker
function definition()
{
	return [
		'created_at' => Carbon::now()->subMonth(rand(1, 12)) // generate random months using Carbon api
	];
}

// get data between two dates using carbon
function exportByDate()
{
	$daterange = explode('-', $daterange);
    $from = $daterange[0];
    $to = $daterange[1];
    $dateFrom = (new Carbon($from))->format('Y-m-d')." 00:00:00";
	$dateTo = (new Carbon($to))->format('Y-m-d')." 23:59:59";

    $locations = DB::table('locations')->select(['id', 'location_name', 'created_at'])
        ->whereBetween('created_at', [$dateFrom, $dateTo])
        ->paginate(15);

    return response()->json([
        'from' => $from,
        'to' => $to,
        'data' => $locations
    ]);
}

// get difference between two dates
$range_date_start = Carbon::parse($request->state_date_start);
$range_date_end = Carbon::parse($request->state_date_end);

$diff_days = $range_date_end->diffInDays($range_date_start);
$diff_months = $range_date_end->diffInMonths($range_date_start);

// inserting date into database with DATE datatype column
$employee_status->reminder = Carbon::parse($request->input('employment_date_start'));

// subtract number of month from date today
$target_date = Carbon::now()->subMonth(2);
```

### Methods & Functions

```php
// collections / methods
// Illuminate\Support\Collection, available Base collections: https://laravel.com/docs/6.x/collections
// Illuminate\Database\Eloquent\Collection, available Eloquent collections: https://laravel.com/docs/6.x/eloquent-collections

// Eloquent collections extend the Base Laravel collection object,
// thus inheriting all the methods provided by the Base collection.

// When retrieving a record from a table using Eloquent ORM, the resulting object is an Eloquent collection.
// So you can use Laravel Base collection methods on Eloquent collections.

// returns a collection of all models
User::all();

// get all models using query builder
DB::table('posts')->get();

// get all models using normal query
DB::select('SELECT \* FROM `posts`');

// limit result
User::all()->take(1);
User::orderBy('column_name', 'desc')->take(1)->get();

// get user with given id
User::find($uid);

// throw a 404 error if a data is not found
User::findOrFail($uid);

// getting only one row of result
User::where('id', 1)->first();
User::where('id', 1)->firstOrFail();

// sorting data
User::orderBy('column_name', 'desc')->get();

// where clause
User::where('column_name', $keyword)->get();

// where clause using query builder
DB::table('table_name')->where('column_name', $keyword)->get();

// convert query builder into raw sql string
DB::table('table_name')->select(['columns'])->orderBy('column', 'desc')->toSql();

// die and dump function, useful in debugging
dd($var);

// when using debugbar
// dump variable details from the console
debug($var);

// redirect to another page
function store() {
	return redirect('/home');
}

// redirect to another page with bind data
// passing a session data when a form is submitted
function store() {
	return redirect('/home')->with('key', 'value');
}

// back() method creates a new redirect response to the previous location
function store() {
	return back()->withStatus('Excel Imported!'); // withStatus() binds a session with a key of 'status'
}

// getting piece of data from a form
function store() {
	$field = request('field_name');
}

// displaying a flash message after an ajax request has been fired
function store() {
	session()->flash('success_message', 'User successfully Added!'); // this will refreshes the page with bind session
	return response()->json(['success' => true]); // response to the ajax request
}

// create a pagination
$posts = Post::paginate(1);
$posts = Post::orderBy('title', 'desc')->paginate(1);

// then in blade template under a foreach
// use the link method to paginate the results
{{ $posts->links() }}

// get the value of specific property of the current logged in user
// syntax: auth()->user()->property
$user_id = auth()->user()->id;

// get the data of currently logged in user
$user_id = auth()->user('id');

function update(Request $request, $id)
{
    // get only specific field
    $post->update($request->only(['name']));

    // get field with exceptions
    $post->update($request->except(['name']));

    // accept only fields that are validated
    $post->update($request->validated());
}

// getting the public path of a file
$path = public_path($file);

// check for authenticated user
Auth::check();
Auth::user()->name;

```

### Snippets

```php
// **_ start of snippet: html boilerplate _**

<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>{{ config('app.name', 'Default App Name') }}</title>

        <link rel="stylesheet" href="css/app.css">
    </head>
    <body class="antialiased">

        <div id="app">
            @yield('content')
        </div>

        <script>window.Laravel = { csrfToken: '{{ csrf_token() }}' }</script>
        <script src="{{ asset('js/app.js') }}"></script>
    </body>

</html>
//  *** end of snippet: html boilerplate ***

// **_ start of snippet: process of creating new module _**
#1 - first create a model:
// in this example were going to make a post feature

php artisan make:model [model name] -m // - 'm' means the model will also create a migration file as soon as it is created
php artisan make:model Post -m

#2 - edit the newly created migration file
/database/migrations

// create the structure of your database table
// available column type: https://laravel.com/docs/8.x/migrations#creating-columns
$table->bigIncrements('id');

// available column modifiers: https://laravel.com/docs/8.x/migrations#column-modifiers
$table->string('name')->nullable();

class CreatePostsTable extends Migration
{
	public function up() {
        Schema::create('posts', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('user_id');
            $table->string('caption');
            $table->string('image');
            $table->timestamps();
            $table->index('user_id');
        });
    }
}

#3 - migrate the database
php artisan migrate // - migrate database to the latest state

#4 - create a table relationship if any
// one to many relationship
// in this example a Post belongs to one User and a User has many posts
// a post belongs to one user

class Post extends Model
{
	public function user() {
		return $this->belongsTo(User::class);
	}
}

// reversely one User has many posts

class User extends Authenticatable
{
	// observe singular and plural naming convention
	public function posts() {
		return $this->hasMany(Post::class);
	}
}

#5 - create routes
/routes/web.php
// in creating routes for controller refer to the documentation:
// https://laravel.com/docs/6.x/controllers#resource-controllers

Route::get('/p', 'PostController@create');

#6 - create the controller and method
php artisan make:controller [options] [controller name]
php artisan make:controller PostsController

// modify the controller file and create necessary method
app/Http/Controllers

class PostController extends Controller
{
	public function create() {
		// you can use period or slash for declaring path
		return view('posts.create');
	}
}

#6 - creating the views and forms
// blade templating:
// yield is use to call the extended component
// code inside layout/app.blade.php
@yield('content')

// extend component
// code inside posts.blade.php
@extends('layouts.app')

@section('content')

<form action="/p" enctype="multipart/form-data" method="post">
// insert fields here
</form>
@endsection
// **_ end of snippet: process of creating new module _**

// **_ start of snippet: crud operations _**
// code in a controller file

use App\Article; // import model so you can interact with its data from the database
use App\Models\Article; // new model path in laravel 8 version

class ArticleController extends Controller
{
	// insert data into the database
	public function store() {
		// create new instance of the model (representation of 1 row from the database)
		$article = new Article();

        // get data from the form then assign to each of the model properties (column names)
        // method 1: using request() helper
        $article->title = request('title');
        $article->content = request('content');

        // method 2: using $request helper
        $article->title = $request->input('title');
        $article->content = $request->input('content');

        // save the model
        $article->save();

        // redirect after saving the record
        return redirect('/home');
    }

    // deleting data from the database
    public function destroy($id) {
        // find the id of the model
        $article = Article::findOrFail($id);

        // delete the model
        $article->delete();

        return redirect('/home');
    }
}

// **_ end of snippet: crud operation _**

// **_ start of snippet: crud operations version 2 _**

// getting the list of data
function index()
{
	$posts = Post::orderBy('created_at','desc')->paginate(10);
	return view('posts.index')->with('posts', $posts);
}

// fetch a single record
// you can also pass into parameter the class of the model for more access
function show(Post $post){}

function show($id)
{
	$post = Post::find($id);
	return view('posts.show')->with('post', $post);
}

// render the creation page (the form page)
function create()
{
	return view('posts.create');
}

// store the data into the database with validation
// set headers in api when sending a post request:
// content-type: application/json - request is a json data
// accept: application/json - response is a json data
function store(Request $request)
{
    $this->validate($request, [
		'title' => 'required',
		'body' => 'required',
	]);

    // Create Post
    $post = new Post;
    $post->title = $request->input('title');
    $post->body = $request->input('body');
    $post->save();

    return redirect('/posts')->with('success', 'Post Created');
}

// show the edit page and fetch data with authorization
function edit($id)
{
    $post = Post::find($id);

    //Check if post exists before deleting
    if (!isset($post)){
        return redirect('/posts')->with('error', 'No Post Found');
    }

    // Check for correct user
    if(auth()->user()->id !==$post->user_id){
        return redirect('/posts')->with('error', 'Unauthorized Page');
    }

    return view('posts.edit')->with('post', $post);
}

// update data into the database
// you can also pass into parameter the class of the model for more access
function update(Request $request, Post $post){}
function update(Request $request, $id)
{
    $this->validate($request, [
		'title' => 'required',
		'body' => 'required'
	]);

    $post = Post::find($id);

    // Update Post
    $post->title = $request->input('title');
    $post->body = $request->input('body');
    $post->save();

    // or you can also update using update() method
    // you can use this if all database fields are satisfied by the data from request payload
    // note: avoid using all() method to get all request field for security purpose
    $post->update($request->all());

    return redirect('/posts')->with('success', 'Post Updated');
}

// deleting data from the database
function destroy($id)
{
    $post = Post::find($id);

    //Check if post exists before deleting
    if (!isset($post)){
        return redirect('/posts')->with('error', 'No Post Found');
    }

    // Check for correct user
    if(auth()->user()->id !== $post->user_id){
        return redirect('/posts')->with('error', 'Unauthorized Page');
    }

    $post->delete();

    // or you can also use the destroy() method to directly remove an entity (object/model)
    Post::destroy($id);

    return redirect('/posts')->with('success', 'Post Removed');

}

// **_ end of snippet: crud operations version 2 _**

// **_ start of snippet: organizing a column in a table _**

function up() {
	Schema::table('table_name', function(Blueprint $table) {
		$table->renameColumn('column_name', 'column_name_old');
	});

    // add a new column with the regular name:
    Schema::table('table_name', function(Blueprint $table) {
        $table->string('column_name')->after('other_column');
    });

    // copy the data across to the new column:
    DB::table('table_name')->update(['column_name' => DB::raw('column_name_old')]);

    // remove the old column:
    Schema::table('table_name', function(Blueprint $table) {
        $table->dropColumn('column_name_old');
    });
}

// **_ end of snippet: organizing a column in a table _**

// **_ start of snippet: uploading image _**
function store(Request $request) {
    $this->validate($request, [
        'thumbnail' => 'image|nullable|max:1999'
    ]);

    // handle file upload
    if ($request->hasFile('thumbnail')) {
        // get filename with extension
        $filenameWithExt = $request->file('thumbnail')->getClientOriginalName();
        // get filename only by using php function
        $filename = pathinfo($filenameWithExt, PATHINFO_FILENAME);
        // get extension only
        $extension = $request->file('thumbnail')->getClientOriginalExtension();
        // filename to store
        $fileNameToStore = time().'_'.$filenameWithExt;
        // upload the actual image / file
        $path = $request->file('thumbnail')->storeAs('public/thumbnails', $fileNameToStore);

    } else {
        $fileNameToStore = 'noimage.jpg';
    }

    $posts = new Post();
    $posts->thumbnail = $fileNameToStore;
    $posts->save();

    return redirect('/posts')->with('success', 'Data successfully saved!');
}

// deleting a file from the storage
Storage::delete('public/images/'.$file_name);

// note: file will be upload in public storage directory:
laravelapp/storage/app/public

// create a link to the public folder from the storage/app/public folder
// so folders from the storage will create a copy into the public folder and will sync automatically
php artisan storage:link

// output image in blade template
@foreach ($posts as $post)
<img src="storage/thumbnails/{{ $post->thumbnail }}" alt="">
@endforeach

// deleting a file from the storage
Storage::delete('file_path');

// **_ end of snippet: uploading image _**

// **_ start of snippet: query using pdo method _**
$sql = Model::select('column')->toSql();
$db = DB::getPdo();

$query = $db->prepare($sql);
$query->execute();

while ($name = $query->fetchColumn()) {
	// process data
}
// **_ end of snippet: query using pdo method _**

// **_ start of snippet: passing external variable to a query _**
// you can pass the necessary variables from the parent scope into the closure with the 'use' keyword

// parent variable declaration
$activated = true;

DB::table('users')->where(function ($query) use ($activated) {
	$query->where('activated', '=', $activated);
})->get();

// using the modern arrow function
DB::table('users')->where(fn($query) => $query->where('activated', '=', $activated))->get();

// differences compared to the regular function syntax:
// -> fn keyword instead of function.
// -> No need to explicitly list all variables which should be captured from the parent scope -
// this is now done automatically by-value. See the lack of use keyword in the latter example.
// -> Arrow functions always return a value. This also means that it's impossible to use void return type when declaring them.
// -> The return keyword must be omitted.
// -> Arrow functions must have a single expression which is the return statement.
// Multi-line functions aren't supported at the moment. You can still chain methods though.

// **_ end of snippet: passing external variable to a query _**

// **_ start of snippet: creating custom middleware _**

// create your custom middleware file
// code in app/Http/Middleware/AuthPermission.php
class AuthPermission
{
	public function handle(Request $request, Closure $next, $permission)
	{
		$isLoggedIn = Auth::check();

        if ($isLoggedIn) {
            $permissions = Auth::user()->role->permissions;
            $permissions = explode(',', $permissions);

            if (!in_array($permission, $permissions)) {
                abort(401, 'Unauthorized');
            }
        }

        return $next($request);
    }
}

// register middleware in Kernel
// code in app/Http/Kernel.php
$routeMiddleware = [
	'permission' => \App\Http\Middleware\AuthPermission::class
];

// using custom middleware in routes/groups
Route::middleware(['auth:sanctum','permission:masterlists'])->group(function () {
	Route::resource('companies', CompanyController::class);
});

// **_ end of snippet: creating custom middleware _**
```

### Debugging & Common Issues

```php
// issue: grouby clause error
// error message: SQLSTATE[42000]: Syntax error or access violation: 1055 Expression #1
// fix:
// change mysql configuration in config/database

$config = [
	'mysql' => [
		'strict' => false
	],
];

// issue: laravel excel zip class not found
// fix: install ZIP Archive php extension

// issue: slow query
// fix: indexing

function up() {
	Schema::create('employee_statuses', function (Blueprint $table) {
		$table->id();
		$table->integer('employee_id')->index();
		$table->timestamps();
		$table->index(['created_at', 'updated_at']);
	});
}
```
