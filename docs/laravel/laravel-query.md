# Query Builder API

### Database Connection & Usage

```php

//  basic database usage
DB::connection('connection_name');

//  running a select query

$results = DB::select('select * from users where id = ?', [1]);
$results = DB::select('select * from users where id = :id', ['id' => 1]);


//  running a general statement
DB::statement('drop table users');

//  listening for query events

DB::listen(function($sql, $bindings, $time) {
   // code_here;
});

```

### Database Transactions

```php

DB::transaction(function() {
   DB::table('users')->update(['votes' => 1]);
   DB::table('posts')->delete();
});

DB::beginTransaction();
DB::rollback();
DB::commit();


//  retrieving all rows from a table
DB::table('name')->get();

//  chunking results from a table

DB::table('users')->chunk(100, function($users) {
   foreach ($users as $user) {}
});


//  retrieving a single row from a table

$user = DB::table('users')->where('name', 'John')->first();
DB::table('name')->first();


//  get only values from a collection
//  retrieving a single column from a row

$name = DB::table('users')->where('name', 'John')->pluck('name');
DB::table('name')->pluck('column');


//  retrieving a list of column values

$roles = DB::table('roles')->lists('title');
$roles = DB::table('roles')->lists('title', 'name');


//  specifying a select clause

$users = DB::table('users')->select('name', 'email')->get();
$users = DB::table('users')->distinct()->get();
$users = DB::table('users')->select('name as user_name')->get();


//  adding a select clause to an existing query

$query = DB::table('users')->select('name');
$users = $query->addSelect('age')->get();

```

### Query with Operators

```php
//  using where operators

$users = DB::table('users')->where('votes', '>', 100)->get();

$users = DB::table('users')
   ->where('votes', '>', 100)
   ->orWhere('name', 'John')
   ->get();

$users = DB::table('users')->whereBetween('votes', [1, 100])->get();
$users = DB::table('users')->whereNotBetween('votes', [1, 100])->get();
$users = DB::table('users')->whereIn('id', [1, 2, 3])->get();
$users = DB::table('users')->whereNotIn('id', [1, 2, 3])->get();
$users = DB::table('users')->whereNull('updated_at')->get();

DB::table('name')->whereNotNull('column')->get();


//  dynamic where clauses

$admin = DB::table('users')->whereId(1)->first();

$john = DB::table('users')
   ->whereIdAndEmail(2, 'john@doe.com')
   ->first();

$jane = DB::table('users')
   ->whereNameOrAge('Jane', 22)
   ->first();


//  order by, group by, and having

$users = DB::table('users')
   ->orderBy('name', 'desc')
   ->groupBy('count')
   ->having('count', '>', 100)
   ->get();



DB::table('name')->orderBy('column')->get();
DB::table('name')->orderBy('column','desc')->get();
DB::table('name')->having('count', '>', 100)->get();


//  offset & limit
$users = DB::table('users')->skip(10)->take(5)->get();
```

### Join Statements

```php
//  laravel joins
//  basic join statement

DB::table('users')
   ->join('contacts', 'users.id', '=', 'contacts.user_id')
   ->join('orders', 'users.id', '=', 'orders.user_id')
   ->select('users.id', 'contacts.phone', 'orders.price')
   ->get();


//  left join statement

DB::table('users')
   ->leftJoin('posts', 'users.id', '=', 'posts.user_id')
   ->get();


//  parameter grouping

// sample 1:
// raw query: "select * from `users` where `name` = ‘John’ or (`votes` > 100 and `title` <> ‘Admin’)"
DB::table('users')
   ->where('name', '=', 'John')
   ->orWhere(function($query) {
           $query->where('votes', '>', 100)->where('title', '<>', 'Admin');
   })
   ->get();

// sample 2:
// raw query: "select * from `users` where `gender` = ? and  (`birth_date` > ? or `birth_date` <= ?)"
DB::table('users')
   ->where('gender', '=', 'Male')
   ->where(function($query) {
       $query->where('birth_date', '>', now()->subYears(9))
           ->orWhere('birth_date', '<=', now()->subYears(65));
   })
   ->get();

```

### Working with Aggregates

```php
//  laravel aggregates

$users = DB::table('users')->count();
$price = DB::table('orders')->max('price');
$price = DB::table('orders')->min('price');
$price = DB::table('orders')->avg('price');
$total = DB::table('users')->sum('votes');

DB::table('name')->remember(5)->get();
DB::table('name')->remember(5, 'cache-key-name')->get();
DB::table('name')->cacheTags('my-key')->remember(5)->get();
DB::table('name')->cacheTags(array('my-first-key','my-second-key'))->remember(5)->get();


//  laravel raw expressions

$users = DB::table('users')
   ->select(DB::raw('count(*) as user_count, status'))
   ->where('status', '<>', 1)
   ->groupBy('status')
   ->get();


//  return rows
DB::select('select * from users where id = ?', array('value'));

//  return nr affected rows

DB::insert('insert into foo set bar=2');
DB::update('update foo set bar=2');
DB::delete('delete from bar');


//  returns void
DB::statement('update foo set bar=2');

//  raw expression inside a statement
DB::table('name')->select(DB::raw('count(*) as count, column2'))->get();

//  laravel inserts / updates / deletes / unions / pessimistic locking
//  inserts

DB::table('users')->insert(
   ['email' => 'john@example.com', 'votes' => 0]
);

$id = DB::table('users')->insertGetId(
   ['email' => 'john@example.com', 'votes' => 0]
);

DB::table('users')->insert([
   ['email' => 'taylor@example.com', 'votes' => 0],
   ['email' => 'dayle@example.com', 'votes' => 0]
]);


//  updates

DB::table('users')
   ->where('id', 1)
   ->update(['votes' => 1]);

DB::table('users')->increment('votes');
DB::table('users')->increment('votes', 5);
DB::table('users')->decrement('votes');
DB::table('users')->decrement('votes', 5);
DB::table('users')->increment('votes', 1, ['name' => 'John']);


//  deletes

DB::table('users')->where('votes', '<', 100)->delete();
DB::table('users')->delete();
DB::table('users')->truncate();


//  unions. the unionAll() method is also available, and has the same method signature as union.

$first = DB::table('users')->whereNull('first_name');
$users = DB::table('users')->whereNull('last_name')->union($first)->get();


//  pessimistic locking

DB::table('users')->where('votes', '>', 100)->sharedLock()->get();
DB::table('users')->where('votes', '>', 100)->lockForUpdate()->get();


//  getting the latest row
$last_row = DB::table('jobbands')->latest('order')->first();

//  updating multiple row with specific id's

payload: [
   {id: 4, employee_id: 1, form_setting_id: 2, level: 1, action: "note", approved_mark: "alright",…},
   {id: 1, employee_id: 1, form_setting_id: 2, level: 2, action: "approve",…},
   {id: 5, employee_id: 1, form_setting_id: 2, level: 3, action: "assess", approved_mark: "asdfaf",…}
];

//  code in route:
Route::put('form_approvers/order', [FormApproverController::class, 'changeOrder']);

//  code in controller:

function changeOrder() {
   $form_approvers = request('payload');

   foreach ($form_approvers as $form_approver) {
       FormApprover::find($form_approver['id'])->update(['level' => $form_approver['level']]); // update each 'level' column
   }

   return response()->json($form_approvers);
}

```

### Fetching records with Constraints

```php
//  fetching the latest record with join relationship

$data = DB::table('employees')
   ->leftJoin('employee_statuses', function($join) {
       $join->on('employee_statuses.created_at', DB::raw('(SELECT MAX(employee_statuses.created_at) FROM employee_statuses WHERE employee_statuses.employee_id = employees.id)'));
   })
   ->select([
       'employees.id',
       'employees.first_name',
       'employee_statuses.employment_type'
   ])
   ->where('employee_statuses.employment_type', '=', 'probationary')
   ->get();
```

```php

//  fetching record if id not exist in another table

// method 1:
$form_type = $request->input('form_type');

$subunits = DB::table('subunits')
   ->select([
       'subunits.id',
       'subunits.code',
       'subunits.department_id',
       'subunits.subunit_name',
       'subunits.created_at',
   ])
   ->whereNotExists(function ($query) use ($form_type) {
       $query->select(DB::raw(1))
           ->from('forms')
           ->whereRaw('subunits.id = forms.subunit_id')
           ->where('forms.form_type', '=', $form_type);
   })
   ->get();

// method 2:
DB::table('table_1')
   ->whereNotIn('id', DB::table('table_2')->pluck('foreign_id'))
   ->get();

```

```php
//  mapping to fetch the count of employees per age range

$ranges = [
   '15-19' => 19,
   '20-24' => 24,
   '25-29' => 29,
   '30-34' => 34,
   '85+' => 100,
];

$output = DB::table('employees')
   ->where('employees.gender', '=', 'Male')
   ->get()
   ->map(function ($employee) use ($ranges) {
       $age = Carbon::parse($employee->birthdate)->age;

       foreach($ranges as $key => $breakpoint) {
           if ($breakpoint >= $age) {
               $employee->range = $key;
               break;
           }
       }

       return $employee;
   })
   ->mapToGroups(function ($employee, $key) {
       return [$employee->range => $employee];
   })
   ->map(function ($group) {
       return count($group);
   })
   ->sortKeys();



// modify query with map method
$approver = DB::table($table)
   ->leftJoin('employees as approvers', 'forms.employee_id', '=', 'approvers.id')
   ->select([
       'approvers.first_name as approver_first_name',
       'approvers.last_name as approver_last_name',
   ])
   ->where($table.'.id', '=', $form_id)
   ->get()
   ->map(function ($approver) {
       $approver->full_name = $approver->approver_first_name.' '.$approver->approver_last_name;
       $approver->status_mark = ($approver->status_mark) ? $approver->status_mark : 'PENDING';
       return $approver;
   });


//  find by specific column
$datachange = DatachangeForms::where('manpower_id', '=', $manpower->id)->firstOrFail();

//  update query

$update = DB::table('employee_positions')
   ->where('employee_id', $employee_id)
   ->update([
       'position_id' => $change_position_id,
       'jobrate_id' => $request->jobrate_id
   ]);
```

```php

//  multiple conditional query

$query = DB::table('employees AS emp')
   ->leftJoin('employees AS ref', 'emp.referrer_id', '=', 'ref.id')
   ->select([
       'emp.id',
       'emp.first_name',
       'emp.middle_name',
       'emp.last_name',
   ])
   ->where('emp.current_status', '!=', 'approved')
   ->where(function($query) use ($value){
       $query->where('emp.last_name', 'LIKE', $value)
           ->orWhere('emp.middle_name', 'LIKE', $value)
           ->orWhere('emp.first_name', 'LIKE', $value);
   });

$query->get();


//  where query with max value
//  in this scenario 'month' column has an integer value of 1,2,3

$query = DB::table('employees')
   ->select(['id', 'month'])
   ->where(DB::raw("(SELECT MAX(`month`) FROM monthly_evaluations)"), '<', 3)
   ->get();


//  searching with column combination

if (!empty($keyword)) {
   $value = '%'.$keyword.'%';

   $employees = $query
       ->where(function($query) use ($value){
           $query->where('employees.last_name', 'LIKE', $value)
               ->orWhere('employees.middle_name', 'LIKE', $value)
               ->orWhere('employees.first_name', 'LIKE', $value)
               ->orWhereRaw("CONCAT(employees.first_name, ' ', employees.last_name) LIKE '{$value}'")
               ->orWhereRaw("CONCAT(employees.first_name, ' ', employees.middle_name, ' ', employees.last_name) LIKE '{$value}'");
       });
}


//  join with condition

$query->when(!Helpers::checkPermission('show_alluser_archive'), function ($query) use ($table) {
   $query->leftJoin('form_history', $table.'.id', '=', 'form_history.form_id');
});


//  query with date string conversion

$employees = $query->where(function ($q) use ($inactive) {
   $q->where(function ($innerQ) use ($inactive) {
       $innerQ->whereNotIn('employee_states.employee_state_label', $inactive)
           ->orWhereNull('employee_states.employee_state');
   })
   ->orWhere(function ($innerQ) use ($inactive) {
       $innerQ->whereIn('employee_states.employee_state_label', $inactive)
           ->whereDate(DB::raw("STR_TO_DATE(employee_states.state_date, '%M %e, %Y')"), '>', date('Y-m-d'));
   });
});

```

```php
//  getting date difference using raw query in query builder
//  getting the tenure of an employee


$query = DB::table('employees')
->select([
   // stance 1
   DB::raw('TIMESTAMPDIFF(YEAR, employee_statuses.hired_date_fix, NOW()) AS tenure'),

   // stance 2
   DB::raw('CASE
       WHEN employee_states.employee_state = "resigned"
       THEN TIMESTAMPDIFF(YEAR, employee_statuses.hired_date_fix, STR_TO_DATE(employee_states.state_date, "%M %e, %Y"))
       ELSE TIMESTAMPDIFF(YEAR, employee_statuses.hired_date_fix, NOW())
       END AS tenure')
])
->paginate();


```

```php
//  using raw query to concat & remove whitespaces

if ($requestor) {
   $requestor = str_replace(' ', '', $requestor);
   $query->whereRaw("CONCAT(REPLACE(requestor.last_name, ' ', ''), ',', REPLACE(requestor.first_name, ' ', ''), REPLACE(requestor.middle_name, ' ', '')) LIKE ?", ["%$requestor%"]);
}


//  query data based on date condition

$target_date = Carbon::now()->subMonth(1);
$query = DB::table('employees')->whereDate('employee_statuses.reminder', '<=', $target_date)->get();


//  filtering records after fetching using query builder
//  getting the count of records with due date

$target_date = Carbon::now();
$getmanpower = DB::table('manpower_forms')->get();

$count = $getmanpower->filter(function ($record) use ($target_date) {
   return $record->effectivity_date <= $target_date;
})->count();
```
