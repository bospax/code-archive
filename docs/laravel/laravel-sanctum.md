# Sanctum Auth Package

### Setup & Configuration

```php
// refer to the documentation for installation:
https://laravel.com/docs/8.x/sanctum#installation

// install sanctum
composer require laravel/sanctum

// publish sanctum configuration
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"

// migrate sanctum migration
php artisan migrate

// add sanctum middleware to api group
// code in app/Http/Kernel.php

$middlewareGroups = [
    'api' => [
        \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
        'throttle:api',
        \Illuminate\Routing\Middleware\SubstituteBindings::class,
    ]
];

```

```php
// code in api.php

// protect route using sanctum middleware
Route::middleware('auth:sanctum')->get('/secrets', [SecretController::class, 'index']);

Route::post('/token', function (Request $request) {
    if (Auth::attempt($request->only('email', 'password'))) {
        // create token from login request
        $token = $request->user()->createToken('developer-access');

        // get all tokens of the user
        $tokens = [];
        foreach ($user->tokens as $token) {
            $tokens[] = $token;
        }

        // delete a token
        $user->tokens()->delete();

        // create token with abilities
        $user = User::find(9);
        $token = $user->createToken('developer-access', ['categories-list']);

        return ['token' => $token->plainTextToken]; // return unhashed token
    }
});

Route::post('/login', function (Request $request) {
    $data = $request->validate([
        'email' => 'required',
        'password' => 'required'
    ]);

    if (Auth::attempt($request->only('email', 'password'))) {
        return auth()->user(); // return authenticated user data
    }
});


// code in controller
class SecretController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth'); // protect controller
    }

    public function index(Request $request)
    {
        $id = Auth::user()->id; // get authenticated user id
        $user = User::find($id);

        // if (!$user->tokenCan('categories-show')) {
        //     abort(401, 'Unauthorized');
        // }

        // check if user has the token permission
        if (!auth()->user()->tokenCan('categories-show')) {
            abort(401, 'Unauthorized');
        }

        return $request->user()->secrets;
    }
}


// method in handling login
<script>
    handleLogin() {
        axios.get('/sanctum/csrf-cookie').then(response => {
            console.log(response);

            axios.post('api/login', this.formData).then(response => {
                console.log(response);
            });
        });
    },
</script>
```

### Authentication Setup (Session Based API)

```php

// setup sanctum and configuration
// code in config/cors.php
return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['*'],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => false, // change value to 'true' if spa client is hosted in another domain
];

// front end setup
// code in app.js / bootstrap.js
<script>
    window.axios.defaults.withCredentials = true;
</script>

// setup the frontend api configuration
// code in resources/js/api/Api.js
<script>
    import axios from "axios";

    let Api = axios.create({
        baseURL: '/api'
    });

    export default Api;
</script>

// code in resources/js/api/Csrf.js
<script>
    import Api from './Api';

    export default {
        getCookie() {
            return Api.get('/csrf-cookie');
        }
    }
</script>

// code in resources/js/api/Action.js
<script>
import User from './User';

export default {
    logout() {
        User.logout()
        .then(() => {
            localStorage.removeItem('auth');
            localStorage.removeItem('session');
            window.location.href = '/login';
            // this.$router.push({name: 'Login'});
        });
    }
}
</script>

// code in resources/js/api/Encrypt.js
<script>
import Api from './Api';

var CryptoJS = require("crypto-js");
var SECRET_KEY = '6R7wTUZriU6R7wTUZriUQFMsoeAFUuQFMsoeAFUu';

export default {
	encrypt(data) {
		var ciphertext = CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
		return ciphertext;
	},

	decrypt(data) {
		var bytes  = CryptoJS.AES.decrypt(data, SECRET_KEY);
		var decryptedData = bytes.toString(CryptoJS.enc.Utf8);
		return decryptedData;
	},

	encryptOBJ(obj) {
		var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(obj), SECRET_KEY).toString();
		return ciphertext;
	},

	decryptOBJ(obj) {
		var bytes  = CryptoJS.AES.decrypt(obj, SECRET_KEY);
		var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
		return decryptedData;
	}
};
</script>

// code in resources/js/api/User.js
<script>
import Api from './Api';
import Csrf from './Csrf';

export default {
    async register(form) {
        await Csrf.getCookie();
        return Api.post('/register', form);
    },

    async login(form) {
        await Csrf.getCookie();
        return Api.post('/login', form)
    },

    async logout() {
        await Csrf.getCookie();
        return Api.post('/logout')
    },

    async auth() {
        await Csrf.getCookie();
        return Api.get('/users/authenticated')
    },

    async change(form) {
        await Csrf.getCookie();
        return Api.post('/user/change', form)
    }
}
</script>

// sample setup for vue components
// code in Login.vue component
<script>
import User from '../api/User';
import Crypto from '../api/Encrypt';

export default {
    methods: {
		register() {
            User.register(this.form)
            .then(() => {
                this.$router.push({name: 'Login'});
            })
            .catch((err) => {
                if (err.response.status === 422) {
                    console.log(err.response.data);
                }
            });
        },

        login() {
            User.login(this.form)
            .then((res) => {
                var auth = Crypto.encrypt('true');
                var permissions = Crypto.encrypt(res.data.permissions)
                localStorage.setItem('auth', auth);
                localStorage.setItem('session', permissions);
                window.location.href = '/dashboard';
            })
            .catch((err) => {
                if (err.response.status == 422) {
                    this.fieldValidation(err);
                }
            });
        },
    },
}
</script>

// check if user is authenticated to protect components
// code in MainHeader.vue component
<script>
import User from '../api/User';
import Action from '../api/Action';

export default {
    data() {
        return {
            authenticated_user: '',
            permissions: [],
        }
    },

    created() {
        this.authenticate();
    },

    methods: {
        authenticate() {
            User.auth().then((res) => {
                if (res.data) {
                    this.authenticated_user = res.data[0];
                    this.profile_image = (res.data[0].image) ? res.data[0].image : 'noimage.png';
                    this.permissions = (res.data[0].permissions) ? res.data[0].permissions.split(',') : [];
                } else {
                    Action.logout();
                }
            })
            .catch(err => {
                if (err.response.status == 401) {
                    Action.logout();
                }
            });
        },

        logout() {
            Action.logout();
        }
    },
}
</script>

// setup backend routes
// code in api.php
Route::middleware(['auth'])->group(function () {
    Route::post('user/change', [UserController::class, 'changePassword']);
    Route::get('users/authenticated', [UserController::class, 'authenticated']);
});

Route::post('/login', [LoginController::class, 'login']);
Route::post('/logout', [LoginController::class, 'logout']);


// code in UserController.php
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

public function authenticated()
{
    $isLoggedIn = Auth::check();

    if ($isLoggedIn) {
        $current_user = Auth::user();
        return $current_user;
    }

    return false;
}


// code in LoginController.php
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

public function login(Request $request)
{
    $request->validate([
        'username' => ['required'],
        'password' => ['required']
    ]);

    if (Auth::attempt($request->only('username', 'password'))) {
        $permissions = Auth::user()->role->permissions;
        return response()->json(['user' => Auth::user(), 'permissions' => $permissions], 200);
    }

    throw ValidationException::withMessages([
        'username' => ['The provided credentials are incorrect.'],
        'password' => ['The provided credentials are incorrect.']
    ]);
}

public function logout()
{
    Auth::logout();
    return response()->json('logout');
}

```

### API Structure (Token Based API)

```php

// it is a good practice to use reusable function to structure api responses
// reusable code using traits
// code in app/Traits/HttpResponses.php

namespace App\Traits;

trait HttpResponses {

    protected function success($data, string $message = null, int $code = 200)
    {
        return response()->json([
            'status' => 'Request was successful.',
            'message' => $message,
            'data' => $data
        ], $code);
    }

    protected function error($data, string $message = null, int $code)
    {
        return response()->json([
            'status' => 'An error has occurred...',
            'message' => $message,
            'data' => $data
        ], $code);
    }
}


// sample response code in controller

class AuthController extends Controller
{
    use HttpResponses;

    public function login(LoginUserRequest $request)
    {
        $user = User::where('email', $request->email)->first();

        return $this->success([
            'user' => $user,
            'token' => $user->createToken('API Token')->plainTextToken
        ]);
    }
}


// organizing resource for proper response format
// code in resource/TasksResource.php

public function toArray($request)
{
    return [
        'id' => (string) $this->id,
        'attributes' => [
            'name' => $this->name,
            'description' => $this->description,
            'priority' => $this->priority,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at
        ],
        'relationships' => [
            'id'=> (string) $this->user->id,
            'User name' => $this->user->name,
            'User email' => $this->user->email
        ]
    ];
}



// header configuration when using Postman to post a form
// value in Headers tab:
// KEY: Accept
// VALUE: application/vnd.api+json

// KEY: Content-Type
// VALUE: application/vnd.api+json

// when updating a data from api use the 'x-www-form-urlencoded'
// this make sure that the data being sent to the server uses the same encoding as the url parameters

// always set variables for token in postman

// setting expiration in api tokens
// code in config/sanctum.php file

[
    'expiration' => null, // here you can set the expiration in number of minutes
]


// implement laravel scheduler to trigger the expiration
// the scheduler will delete expired tokens every certain amount of time
// code in app/Console/Kernel.php file

protected function schedule(Schedule $schedule) {
    // using the sanctum artisan command to prune/remove expired tokens
    // in this case the command will remove tokens that have expired 24 hrs ago, this will be perform in daily basis
    $schedule->command('sanctum:prune-expired --hours=24')->daily();
}


// check the list of schedule
php artisan schedule:list

// run the scheduler
php artisan schedule:work

```

### API Versioning

```php


// code in api.php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\v1\TaskController as v1_TaskController;
use App\Http\Controllers\API\v2\TaskController as v2_TaskController;

Route::prefix('v1')->group(function () {
    Route::resource('tasks', v1_TaskController::class);
});

Route::prefix('v2')->group(function () {
    Route::resource('tasks', v2_TaskController::class);
});


// You'll need to create separate controller classes for each API version.
// These controllers will handle the logic for the respective versions of the API. For example:

app/Http/Controllers/API/v1/TaskController.php
app/Http/Controllers/API/v2/TaskController.php

// generate controller using artisan with path
// This will generate the TaskController.php file inside the app/Http/Controllers/API/v1 directory.
// You can then modify the methods in this controller to implement the logic for the version 1 API.
php artisan make:controller API/v1/TaskController

// In each controller, you can define methods like index, store, show, update, and destroy to handle different API actions.

```

### Auth Structure using Sanctum Tokens

```php

// code in controller file

class AuthController extends Controller
{
    use HttpResponses;

    public function login(LoginUserRequest $request)
    {
        $request->validated($request->only(['email', 'password']));

        if (!Auth::attempt($request->only(['email', 'password']))) {
            return $this->error('', 'Credentials do not match', 401);
        }

        $user = User::where('email', $request->email)->first();

        return $this->success([
            'user' => $user,
            'token' => $user->createToken('API Token')->plainTextToken
        ]);
    }

    public function register(StoreUserRequest $request)
    {
        $request->validated($request->only(['name', 'email', 'password']));

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return $this->success([
            'user' => $user,
            'token' => $user->createToken('API Token')->plainTextToken
        ]);
    }

    public function logout()
    {
        Auth::user()->currentAccessToken()->delete();

        return $this->success([
            'message' => 'You have succesfully been logged out and your token has been removed'
        ]);
    }
}


// make sure to protect routes accessibility
// code in api.php

// public routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

// protected routes
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::resource('/tasks', TasksController::class);
});

```

### Routes with Permissions using Middleware

```php

// *** start of snippet: creating custom middleware ***

// create your custom middleware file
// code in app/Http/Middleware/AuthPermission.php
class AuthPermission
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
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

// *** end of snippet: creating custom middleware ***
```
