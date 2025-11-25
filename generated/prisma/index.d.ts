
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Animal
 * 
 */
export type Animal = $Result.DefaultSelection<Prisma.$AnimalPayload>
/**
 * Model Disease
 * 
 */
export type Disease = $Result.DefaultSelection<Prisma.$DiseasePayload>
/**
 * Model Vaccine
 * 
 */
export type Vaccine = $Result.DefaultSelection<Prisma.$VaccinePayload>
/**
 * Model Deworming
 * 
 */
export type Deworming = $Result.DefaultSelection<Prisma.$DewormingPayload>
/**
 * Model Account
 * 
 */
export type Account = $Result.DefaultSelection<Prisma.$AccountPayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model VerificationToken
 * 
 */
export type VerificationToken = $Result.DefaultSelection<Prisma.$VerificationTokenPayload>
/**
 * Model Authenticator
 * 
 */
export type Authenticator = $Result.DefaultSelection<Prisma.$AuthenticatorPayload>
/**
 * Model Notification
 * 
 */
export type Notification = $Result.DefaultSelection<Prisma.$NotificationPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs, $Utils.Call<Prisma.TypeMapCb, {
    extArgs: ExtArgs
  }>, ClientOptions>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.animal`: Exposes CRUD operations for the **Animal** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Animals
    * const animals = await prisma.animal.findMany()
    * ```
    */
  get animal(): Prisma.AnimalDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.disease`: Exposes CRUD operations for the **Disease** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Diseases
    * const diseases = await prisma.disease.findMany()
    * ```
    */
  get disease(): Prisma.DiseaseDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.vaccine`: Exposes CRUD operations for the **Vaccine** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Vaccines
    * const vaccines = await prisma.vaccine.findMany()
    * ```
    */
  get vaccine(): Prisma.VaccineDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.deworming`: Exposes CRUD operations for the **Deworming** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Dewormings
    * const dewormings = await prisma.deworming.findMany()
    * ```
    */
  get deworming(): Prisma.DewormingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.account`: Exposes CRUD operations for the **Account** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accounts
    * const accounts = await prisma.account.findMany()
    * ```
    */
  get account(): Prisma.AccountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.verificationToken`: Exposes CRUD operations for the **VerificationToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VerificationTokens
    * const verificationTokens = await prisma.verificationToken.findMany()
    * ```
    */
  get verificationToken(): Prisma.VerificationTokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.authenticator`: Exposes CRUD operations for the **Authenticator** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Authenticators
    * const authenticators = await prisma.authenticator.findMany()
    * ```
    */
  get authenticator(): Prisma.AuthenticatorDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.notification`: Exposes CRUD operations for the **Notification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Notifications
    * const notifications = await prisma.notification.findMany()
    * ```
    */
  get notification(): Prisma.NotificationDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.3.1
   * Query Engine version: acc0b9dd43eb689cbd20c9470515d719db10d0b0
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Animal: 'Animal',
    Disease: 'Disease',
    Vaccine: 'Vaccine',
    Deworming: 'Deworming',
    Account: 'Account',
    Session: 'Session',
    VerificationToken: 'VerificationToken',
    Authenticator: 'Authenticator',
    Notification: 'Notification'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "user" | "animal" | "disease" | "vaccine" | "deworming" | "account" | "session" | "verificationToken" | "authenticator" | "notification"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Animal: {
        payload: Prisma.$AnimalPayload<ExtArgs>
        fields: Prisma.AnimalFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AnimalFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimalPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AnimalFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimalPayload>
          }
          findFirst: {
            args: Prisma.AnimalFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimalPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AnimalFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimalPayload>
          }
          findMany: {
            args: Prisma.AnimalFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimalPayload>[]
          }
          create: {
            args: Prisma.AnimalCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimalPayload>
          }
          createMany: {
            args: Prisma.AnimalCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AnimalCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimalPayload>[]
          }
          delete: {
            args: Prisma.AnimalDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimalPayload>
          }
          update: {
            args: Prisma.AnimalUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimalPayload>
          }
          deleteMany: {
            args: Prisma.AnimalDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AnimalUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AnimalUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimalPayload>[]
          }
          upsert: {
            args: Prisma.AnimalUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimalPayload>
          }
          aggregate: {
            args: Prisma.AnimalAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAnimal>
          }
          groupBy: {
            args: Prisma.AnimalGroupByArgs<ExtArgs>
            result: $Utils.Optional<AnimalGroupByOutputType>[]
          }
          count: {
            args: Prisma.AnimalCountArgs<ExtArgs>
            result: $Utils.Optional<AnimalCountAggregateOutputType> | number
          }
        }
      }
      Disease: {
        payload: Prisma.$DiseasePayload<ExtArgs>
        fields: Prisma.DiseaseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DiseaseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiseasePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DiseaseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiseasePayload>
          }
          findFirst: {
            args: Prisma.DiseaseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiseasePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DiseaseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiseasePayload>
          }
          findMany: {
            args: Prisma.DiseaseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiseasePayload>[]
          }
          create: {
            args: Prisma.DiseaseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiseasePayload>
          }
          createMany: {
            args: Prisma.DiseaseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DiseaseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiseasePayload>[]
          }
          delete: {
            args: Prisma.DiseaseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiseasePayload>
          }
          update: {
            args: Prisma.DiseaseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiseasePayload>
          }
          deleteMany: {
            args: Prisma.DiseaseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DiseaseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DiseaseUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiseasePayload>[]
          }
          upsert: {
            args: Prisma.DiseaseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiseasePayload>
          }
          aggregate: {
            args: Prisma.DiseaseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDisease>
          }
          groupBy: {
            args: Prisma.DiseaseGroupByArgs<ExtArgs>
            result: $Utils.Optional<DiseaseGroupByOutputType>[]
          }
          count: {
            args: Prisma.DiseaseCountArgs<ExtArgs>
            result: $Utils.Optional<DiseaseCountAggregateOutputType> | number
          }
        }
      }
      Vaccine: {
        payload: Prisma.$VaccinePayload<ExtArgs>
        fields: Prisma.VaccineFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VaccineFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VaccinePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VaccineFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VaccinePayload>
          }
          findFirst: {
            args: Prisma.VaccineFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VaccinePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VaccineFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VaccinePayload>
          }
          findMany: {
            args: Prisma.VaccineFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VaccinePayload>[]
          }
          create: {
            args: Prisma.VaccineCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VaccinePayload>
          }
          createMany: {
            args: Prisma.VaccineCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VaccineCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VaccinePayload>[]
          }
          delete: {
            args: Prisma.VaccineDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VaccinePayload>
          }
          update: {
            args: Prisma.VaccineUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VaccinePayload>
          }
          deleteMany: {
            args: Prisma.VaccineDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VaccineUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VaccineUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VaccinePayload>[]
          }
          upsert: {
            args: Prisma.VaccineUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VaccinePayload>
          }
          aggregate: {
            args: Prisma.VaccineAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVaccine>
          }
          groupBy: {
            args: Prisma.VaccineGroupByArgs<ExtArgs>
            result: $Utils.Optional<VaccineGroupByOutputType>[]
          }
          count: {
            args: Prisma.VaccineCountArgs<ExtArgs>
            result: $Utils.Optional<VaccineCountAggregateOutputType> | number
          }
        }
      }
      Deworming: {
        payload: Prisma.$DewormingPayload<ExtArgs>
        fields: Prisma.DewormingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DewormingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DewormingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DewormingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DewormingPayload>
          }
          findFirst: {
            args: Prisma.DewormingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DewormingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DewormingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DewormingPayload>
          }
          findMany: {
            args: Prisma.DewormingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DewormingPayload>[]
          }
          create: {
            args: Prisma.DewormingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DewormingPayload>
          }
          createMany: {
            args: Prisma.DewormingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DewormingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DewormingPayload>[]
          }
          delete: {
            args: Prisma.DewormingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DewormingPayload>
          }
          update: {
            args: Prisma.DewormingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DewormingPayload>
          }
          deleteMany: {
            args: Prisma.DewormingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DewormingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DewormingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DewormingPayload>[]
          }
          upsert: {
            args: Prisma.DewormingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DewormingPayload>
          }
          aggregate: {
            args: Prisma.DewormingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDeworming>
          }
          groupBy: {
            args: Prisma.DewormingGroupByArgs<ExtArgs>
            result: $Utils.Optional<DewormingGroupByOutputType>[]
          }
          count: {
            args: Prisma.DewormingCountArgs<ExtArgs>
            result: $Utils.Optional<DewormingCountAggregateOutputType> | number
          }
        }
      }
      Account: {
        payload: Prisma.$AccountPayload<ExtArgs>
        fields: Prisma.AccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findFirst: {
            args: Prisma.AccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findMany: {
            args: Prisma.AccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          create: {
            args: Prisma.AccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          createMany: {
            args: Prisma.AccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          delete: {
            args: Prisma.AccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          update: {
            args: Prisma.AccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          deleteMany: {
            args: Prisma.AccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AccountUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          upsert: {
            args: Prisma.AccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          aggregate: {
            args: Prisma.AccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccount>
          }
          groupBy: {
            args: Prisma.AccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccountCountArgs<ExtArgs>
            result: $Utils.Optional<AccountCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      VerificationToken: {
        payload: Prisma.$VerificationTokenPayload<ExtArgs>
        fields: Prisma.VerificationTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VerificationTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VerificationTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          findFirst: {
            args: Prisma.VerificationTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VerificationTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          findMany: {
            args: Prisma.VerificationTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          create: {
            args: Prisma.VerificationTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          createMany: {
            args: Prisma.VerificationTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VerificationTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          delete: {
            args: Prisma.VerificationTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          update: {
            args: Prisma.VerificationTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          deleteMany: {
            args: Prisma.VerificationTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VerificationTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VerificationTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          upsert: {
            args: Prisma.VerificationTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          aggregate: {
            args: Prisma.VerificationTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVerificationToken>
          }
          groupBy: {
            args: Prisma.VerificationTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<VerificationTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.VerificationTokenCountArgs<ExtArgs>
            result: $Utils.Optional<VerificationTokenCountAggregateOutputType> | number
          }
        }
      }
      Authenticator: {
        payload: Prisma.$AuthenticatorPayload<ExtArgs>
        fields: Prisma.AuthenticatorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuthenticatorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthenticatorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuthenticatorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthenticatorPayload>
          }
          findFirst: {
            args: Prisma.AuthenticatorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthenticatorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuthenticatorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthenticatorPayload>
          }
          findMany: {
            args: Prisma.AuthenticatorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthenticatorPayload>[]
          }
          create: {
            args: Prisma.AuthenticatorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthenticatorPayload>
          }
          createMany: {
            args: Prisma.AuthenticatorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuthenticatorCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthenticatorPayload>[]
          }
          delete: {
            args: Prisma.AuthenticatorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthenticatorPayload>
          }
          update: {
            args: Prisma.AuthenticatorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthenticatorPayload>
          }
          deleteMany: {
            args: Prisma.AuthenticatorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuthenticatorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AuthenticatorUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthenticatorPayload>[]
          }
          upsert: {
            args: Prisma.AuthenticatorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthenticatorPayload>
          }
          aggregate: {
            args: Prisma.AuthenticatorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuthenticator>
          }
          groupBy: {
            args: Prisma.AuthenticatorGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuthenticatorGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuthenticatorCountArgs<ExtArgs>
            result: $Utils.Optional<AuthenticatorCountAggregateOutputType> | number
          }
        }
      }
      Notification: {
        payload: Prisma.$NotificationPayload<ExtArgs>
        fields: Prisma.NotificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NotificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NotificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findFirst: {
            args: Prisma.NotificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NotificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findMany: {
            args: Prisma.NotificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          create: {
            args: Prisma.NotificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          createMany: {
            args: Prisma.NotificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NotificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          delete: {
            args: Prisma.NotificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          update: {
            args: Prisma.NotificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          deleteMany: {
            args: Prisma.NotificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NotificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NotificationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          upsert: {
            args: Prisma.NotificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          aggregate: {
            args: Prisma.NotificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotification>
          }
          groupBy: {
            args: Prisma.NotificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.NotificationCountArgs<ExtArgs>
            result: $Utils.Optional<NotificationCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    animal?: AnimalOmit
    disease?: DiseaseOmit
    vaccine?: VaccineOmit
    deworming?: DewormingOmit
    account?: AccountOmit
    session?: SessionOmit
    verificationToken?: VerificationTokenOmit
    authenticator?: AuthenticatorOmit
    notification?: NotificationOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    accounts: number
    animals: number
    Authenticator: number
    Notification: number
    sessions: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accounts?: boolean | UserCountOutputTypeCountAccountsArgs
    animals?: boolean | UserCountOutputTypeCountAnimalsArgs
    Authenticator?: boolean | UserCountOutputTypeCountAuthenticatorArgs
    Notification?: boolean | UserCountOutputTypeCountNotificationArgs
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAccountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAnimalsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnimalWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAuthenticatorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuthenticatorWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountNotificationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }


  /**
   * Count Type AnimalCountOutputType
   */

  export type AnimalCountOutputType = {
    offspringFromBull: number
    offspringFromFather: number
    offspringFromMother: number
    dewormings: number
    diseases: number
    Notification: number
    vaccines: number
  }

  export type AnimalCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    offspringFromBull?: boolean | AnimalCountOutputTypeCountOffspringFromBullArgs
    offspringFromFather?: boolean | AnimalCountOutputTypeCountOffspringFromFatherArgs
    offspringFromMother?: boolean | AnimalCountOutputTypeCountOffspringFromMotherArgs
    dewormings?: boolean | AnimalCountOutputTypeCountDewormingsArgs
    diseases?: boolean | AnimalCountOutputTypeCountDiseasesArgs
    Notification?: boolean | AnimalCountOutputTypeCountNotificationArgs
    vaccines?: boolean | AnimalCountOutputTypeCountVaccinesArgs
  }

  // Custom InputTypes
  /**
   * AnimalCountOutputType without action
   */
  export type AnimalCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnimalCountOutputType
     */
    select?: AnimalCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AnimalCountOutputType without action
   */
  export type AnimalCountOutputTypeCountOffspringFromBullArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnimalWhereInput
  }

  /**
   * AnimalCountOutputType without action
   */
  export type AnimalCountOutputTypeCountOffspringFromFatherArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnimalWhereInput
  }

  /**
   * AnimalCountOutputType without action
   */
  export type AnimalCountOutputTypeCountOffspringFromMotherArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnimalWhereInput
  }

  /**
   * AnimalCountOutputType without action
   */
  export type AnimalCountOutputTypeCountDewormingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DewormingWhereInput
  }

  /**
   * AnimalCountOutputType without action
   */
  export type AnimalCountOutputTypeCountDiseasesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DiseaseWhereInput
  }

  /**
   * AnimalCountOutputType without action
   */
  export type AnimalCountOutputTypeCountNotificationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
  }

  /**
   * AnimalCountOutputType without action
   */
  export type AnimalCountOutputTypeCountVaccinesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VaccineWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    cnpj: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
    emailVerified: Date | null
    image: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    cnpj: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
    emailVerified: Date | null
    image: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    cnpj: number
    password: number
    createdAt: number
    updatedAt: number
    emailVerified: number
    image: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    cnpj?: true
    password?: true
    createdAt?: true
    updatedAt?: true
    emailVerified?: true
    image?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    cnpj?: true
    password?: true
    createdAt?: true
    updatedAt?: true
    emailVerified?: true
    image?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    cnpj?: true
    password?: true
    createdAt?: true
    updatedAt?: true
    emailVerified?: true
    image?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string
    email: string
    cnpj: string | null
    password: string | null
    createdAt: Date
    updatedAt: Date
    emailVerified: Date | null
    image: string | null
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    cnpj?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    emailVerified?: boolean
    image?: boolean
    accounts?: boolean | User$accountsArgs<ExtArgs>
    animals?: boolean | User$animalsArgs<ExtArgs>
    Authenticator?: boolean | User$AuthenticatorArgs<ExtArgs>
    Notification?: boolean | User$NotificationArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    cnpj?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    emailVerified?: boolean
    image?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    cnpj?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    emailVerified?: boolean
    image?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    cnpj?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    emailVerified?: boolean
    image?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "cnpj" | "password" | "createdAt" | "updatedAt" | "emailVerified" | "image", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accounts?: boolean | User$accountsArgs<ExtArgs>
    animals?: boolean | User$animalsArgs<ExtArgs>
    Authenticator?: boolean | User$AuthenticatorArgs<ExtArgs>
    Notification?: boolean | User$NotificationArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      accounts: Prisma.$AccountPayload<ExtArgs>[]
      animals: Prisma.$AnimalPayload<ExtArgs>[]
      Authenticator: Prisma.$AuthenticatorPayload<ExtArgs>[]
      Notification: Prisma.$NotificationPayload<ExtArgs>[]
      sessions: Prisma.$SessionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      cnpj: string | null
      password: string | null
      createdAt: Date
      updatedAt: Date
      emailVerified: Date | null
      image: string | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    accounts<T extends User$accountsArgs<ExtArgs> = {}>(args?: Subset<T, User$accountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    animals<T extends User$animalsArgs<ExtArgs> = {}>(args?: Subset<T, User$animalsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnimalPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    Authenticator<T extends User$AuthenticatorArgs<ExtArgs> = {}>(args?: Subset<T, User$AuthenticatorArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthenticatorPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    Notification<T extends User$NotificationArgs<ExtArgs> = {}>(args?: Subset<T, User$NotificationArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly cnpj: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly emailVerified: FieldRef<"User", 'DateTime'>
    readonly image: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.accounts
   */
  export type User$accountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    cursor?: AccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * User.animals
   */
  export type User$animalsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Animal
     */
    select?: AnimalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Animal
     */
    omit?: AnimalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimalInclude<ExtArgs> | null
    where?: AnimalWhereInput
    orderBy?: AnimalOrderByWithRelationInput | AnimalOrderByWithRelationInput[]
    cursor?: AnimalWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AnimalScalarFieldEnum | AnimalScalarFieldEnum[]
  }

  /**
   * User.Authenticator
   */
  export type User$AuthenticatorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Authenticator
     */
    select?: AuthenticatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Authenticator
     */
    omit?: AuthenticatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthenticatorInclude<ExtArgs> | null
    where?: AuthenticatorWhereInput
    orderBy?: AuthenticatorOrderByWithRelationInput | AuthenticatorOrderByWithRelationInput[]
    cursor?: AuthenticatorWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuthenticatorScalarFieldEnum | AuthenticatorScalarFieldEnum[]
  }

  /**
   * User.Notification
   */
  export type User$NotificationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    cursor?: NotificationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * User.sessions
   */
  export type User$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Animal
   */

  export type AggregateAnimal = {
    _count: AnimalCountAggregateOutputType | null
    _avg: AnimalAvgAggregateOutputType | null
    _sum: AnimalSumAggregateOutputType | null
    _min: AnimalMinAggregateOutputType | null
    _max: AnimalMaxAggregateOutputType | null
  }

  export type AnimalAvgAggregateOutputType = {
    weight: number | null
    bodyConditionScore: number | null
  }

  export type AnimalSumAggregateOutputType = {
    weight: number | null
    bodyConditionScore: number | null
  }

  export type AnimalMinAggregateOutputType = {
    id: string | null
    manualId: string | null
    gender: string | null
    birthDate: Date | null
    weight: number | null
    breed: string | null
    category: string | null
    motherId: string | null
    fatherId: string | null
    reproductiveStatus: string | null
    handlingType: string | null
    bullId: string | null
    protocol: string | null
    andrological: string | null
    expectedDueDate: Date | null
    fetalGender: string | null
    bullIatf: string | null
    bodyConditionScore: number | null
    observations: string | null
    ownerId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    dewormingDate: Date | null
    dewormingExpiry: Date | null
    dewormingName: string | null
    status: string | null
    vaccineDate: Date | null
    vaccineExpiry: Date | null
    vaccineName: string | null
  }

  export type AnimalMaxAggregateOutputType = {
    id: string | null
    manualId: string | null
    gender: string | null
    birthDate: Date | null
    weight: number | null
    breed: string | null
    category: string | null
    motherId: string | null
    fatherId: string | null
    reproductiveStatus: string | null
    handlingType: string | null
    bullId: string | null
    protocol: string | null
    andrological: string | null
    expectedDueDate: Date | null
    fetalGender: string | null
    bullIatf: string | null
    bodyConditionScore: number | null
    observations: string | null
    ownerId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    dewormingDate: Date | null
    dewormingExpiry: Date | null
    dewormingName: string | null
    status: string | null
    vaccineDate: Date | null
    vaccineExpiry: Date | null
    vaccineName: string | null
  }

  export type AnimalCountAggregateOutputType = {
    id: number
    manualId: number
    gender: number
    birthDate: number
    weight: number
    breed: number
    category: number
    motherId: number
    fatherId: number
    reproductiveStatus: number
    handlingType: number
    bullId: number
    protocol: number
    andrological: number
    expectedDueDate: number
    fetalGender: number
    bullIatf: number
    bodyConditionScore: number
    observations: number
    ownerId: number
    createdAt: number
    updatedAt: number
    dewormingDate: number
    dewormingExpiry: number
    dewormingName: number
    status: number
    vaccineDate: number
    vaccineExpiry: number
    vaccineName: number
    _all: number
  }


  export type AnimalAvgAggregateInputType = {
    weight?: true
    bodyConditionScore?: true
  }

  export type AnimalSumAggregateInputType = {
    weight?: true
    bodyConditionScore?: true
  }

  export type AnimalMinAggregateInputType = {
    id?: true
    manualId?: true
    gender?: true
    birthDate?: true
    weight?: true
    breed?: true
    category?: true
    motherId?: true
    fatherId?: true
    reproductiveStatus?: true
    handlingType?: true
    bullId?: true
    protocol?: true
    andrological?: true
    expectedDueDate?: true
    fetalGender?: true
    bullIatf?: true
    bodyConditionScore?: true
    observations?: true
    ownerId?: true
    createdAt?: true
    updatedAt?: true
    dewormingDate?: true
    dewormingExpiry?: true
    dewormingName?: true
    status?: true
    vaccineDate?: true
    vaccineExpiry?: true
    vaccineName?: true
  }

  export type AnimalMaxAggregateInputType = {
    id?: true
    manualId?: true
    gender?: true
    birthDate?: true
    weight?: true
    breed?: true
    category?: true
    motherId?: true
    fatherId?: true
    reproductiveStatus?: true
    handlingType?: true
    bullId?: true
    protocol?: true
    andrological?: true
    expectedDueDate?: true
    fetalGender?: true
    bullIatf?: true
    bodyConditionScore?: true
    observations?: true
    ownerId?: true
    createdAt?: true
    updatedAt?: true
    dewormingDate?: true
    dewormingExpiry?: true
    dewormingName?: true
    status?: true
    vaccineDate?: true
    vaccineExpiry?: true
    vaccineName?: true
  }

  export type AnimalCountAggregateInputType = {
    id?: true
    manualId?: true
    gender?: true
    birthDate?: true
    weight?: true
    breed?: true
    category?: true
    motherId?: true
    fatherId?: true
    reproductiveStatus?: true
    handlingType?: true
    bullId?: true
    protocol?: true
    andrological?: true
    expectedDueDate?: true
    fetalGender?: true
    bullIatf?: true
    bodyConditionScore?: true
    observations?: true
    ownerId?: true
    createdAt?: true
    updatedAt?: true
    dewormingDate?: true
    dewormingExpiry?: true
    dewormingName?: true
    status?: true
    vaccineDate?: true
    vaccineExpiry?: true
    vaccineName?: true
    _all?: true
  }

  export type AnimalAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Animal to aggregate.
     */
    where?: AnimalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Animals to fetch.
     */
    orderBy?: AnimalOrderByWithRelationInput | AnimalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AnimalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Animals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Animals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Animals
    **/
    _count?: true | AnimalCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AnimalAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AnimalSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AnimalMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AnimalMaxAggregateInputType
  }

  export type GetAnimalAggregateType<T extends AnimalAggregateArgs> = {
        [P in keyof T & keyof AggregateAnimal]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAnimal[P]>
      : GetScalarType<T[P], AggregateAnimal[P]>
  }




  export type AnimalGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnimalWhereInput
    orderBy?: AnimalOrderByWithAggregationInput | AnimalOrderByWithAggregationInput[]
    by: AnimalScalarFieldEnum[] | AnimalScalarFieldEnum
    having?: AnimalScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AnimalCountAggregateInputType | true
    _avg?: AnimalAvgAggregateInputType
    _sum?: AnimalSumAggregateInputType
    _min?: AnimalMinAggregateInputType
    _max?: AnimalMaxAggregateInputType
  }

  export type AnimalGroupByOutputType = {
    id: string
    manualId: string
    gender: string
    birthDate: Date
    weight: number
    breed: string
    category: string
    motherId: string | null
    fatherId: string | null
    reproductiveStatus: string | null
    handlingType: string | null
    bullId: string | null
    protocol: string | null
    andrological: string | null
    expectedDueDate: Date | null
    fetalGender: string | null
    bullIatf: string | null
    bodyConditionScore: number | null
    observations: string | null
    ownerId: string
    createdAt: Date
    updatedAt: Date
    dewormingDate: Date | null
    dewormingExpiry: Date | null
    dewormingName: string | null
    status: string
    vaccineDate: Date | null
    vaccineExpiry: Date | null
    vaccineName: string | null
    _count: AnimalCountAggregateOutputType | null
    _avg: AnimalAvgAggregateOutputType | null
    _sum: AnimalSumAggregateOutputType | null
    _min: AnimalMinAggregateOutputType | null
    _max: AnimalMaxAggregateOutputType | null
  }

  type GetAnimalGroupByPayload<T extends AnimalGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AnimalGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AnimalGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AnimalGroupByOutputType[P]>
            : GetScalarType<T[P], AnimalGroupByOutputType[P]>
        }
      >
    >


  export type AnimalSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    manualId?: boolean
    gender?: boolean
    birthDate?: boolean
    weight?: boolean
    breed?: boolean
    category?: boolean
    motherId?: boolean
    fatherId?: boolean
    reproductiveStatus?: boolean
    handlingType?: boolean
    bullId?: boolean
    protocol?: boolean
    andrological?: boolean
    expectedDueDate?: boolean
    fetalGender?: boolean
    bullIatf?: boolean
    bodyConditionScore?: boolean
    observations?: boolean
    ownerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    dewormingDate?: boolean
    dewormingExpiry?: boolean
    dewormingName?: boolean
    status?: boolean
    vaccineDate?: boolean
    vaccineExpiry?: boolean
    vaccineName?: boolean
    bull?: boolean | Animal$bullArgs<ExtArgs>
    offspringFromBull?: boolean | Animal$offspringFromBullArgs<ExtArgs>
    father?: boolean | Animal$fatherArgs<ExtArgs>
    offspringFromFather?: boolean | Animal$offspringFromFatherArgs<ExtArgs>
    mother?: boolean | Animal$motherArgs<ExtArgs>
    offspringFromMother?: boolean | Animal$offspringFromMotherArgs<ExtArgs>
    owner?: boolean | UserDefaultArgs<ExtArgs>
    dewormings?: boolean | Animal$dewormingsArgs<ExtArgs>
    diseases?: boolean | Animal$diseasesArgs<ExtArgs>
    Notification?: boolean | Animal$NotificationArgs<ExtArgs>
    vaccines?: boolean | Animal$vaccinesArgs<ExtArgs>
    _count?: boolean | AnimalCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["animal"]>

  export type AnimalSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    manualId?: boolean
    gender?: boolean
    birthDate?: boolean
    weight?: boolean
    breed?: boolean
    category?: boolean
    motherId?: boolean
    fatherId?: boolean
    reproductiveStatus?: boolean
    handlingType?: boolean
    bullId?: boolean
    protocol?: boolean
    andrological?: boolean
    expectedDueDate?: boolean
    fetalGender?: boolean
    bullIatf?: boolean
    bodyConditionScore?: boolean
    observations?: boolean
    ownerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    dewormingDate?: boolean
    dewormingExpiry?: boolean
    dewormingName?: boolean
    status?: boolean
    vaccineDate?: boolean
    vaccineExpiry?: boolean
    vaccineName?: boolean
    bull?: boolean | Animal$bullArgs<ExtArgs>
    father?: boolean | Animal$fatherArgs<ExtArgs>
    mother?: boolean | Animal$motherArgs<ExtArgs>
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["animal"]>

  export type AnimalSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    manualId?: boolean
    gender?: boolean
    birthDate?: boolean
    weight?: boolean
    breed?: boolean
    category?: boolean
    motherId?: boolean
    fatherId?: boolean
    reproductiveStatus?: boolean
    handlingType?: boolean
    bullId?: boolean
    protocol?: boolean
    andrological?: boolean
    expectedDueDate?: boolean
    fetalGender?: boolean
    bullIatf?: boolean
    bodyConditionScore?: boolean
    observations?: boolean
    ownerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    dewormingDate?: boolean
    dewormingExpiry?: boolean
    dewormingName?: boolean
    status?: boolean
    vaccineDate?: boolean
    vaccineExpiry?: boolean
    vaccineName?: boolean
    bull?: boolean | Animal$bullArgs<ExtArgs>
    father?: boolean | Animal$fatherArgs<ExtArgs>
    mother?: boolean | Animal$motherArgs<ExtArgs>
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["animal"]>

  export type AnimalSelectScalar = {
    id?: boolean
    manualId?: boolean
    gender?: boolean
    birthDate?: boolean
    weight?: boolean
    breed?: boolean
    category?: boolean
    motherId?: boolean
    fatherId?: boolean
    reproductiveStatus?: boolean
    handlingType?: boolean
    bullId?: boolean
    protocol?: boolean
    andrological?: boolean
    expectedDueDate?: boolean
    fetalGender?: boolean
    bullIatf?: boolean
    bodyConditionScore?: boolean
    observations?: boolean
    ownerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    dewormingDate?: boolean
    dewormingExpiry?: boolean
    dewormingName?: boolean
    status?: boolean
    vaccineDate?: boolean
    vaccineExpiry?: boolean
    vaccineName?: boolean
  }

  export type AnimalOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "manualId" | "gender" | "birthDate" | "weight" | "breed" | "category" | "motherId" | "fatherId" | "reproductiveStatus" | "handlingType" | "bullId" | "protocol" | "andrological" | "expectedDueDate" | "fetalGender" | "bullIatf" | "bodyConditionScore" | "observations" | "ownerId" | "createdAt" | "updatedAt" | "dewormingDate" | "dewormingExpiry" | "dewormingName" | "status" | "vaccineDate" | "vaccineExpiry" | "vaccineName", ExtArgs["result"]["animal"]>
  export type AnimalInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bull?: boolean | Animal$bullArgs<ExtArgs>
    offspringFromBull?: boolean | Animal$offspringFromBullArgs<ExtArgs>
    father?: boolean | Animal$fatherArgs<ExtArgs>
    offspringFromFather?: boolean | Animal$offspringFromFatherArgs<ExtArgs>
    mother?: boolean | Animal$motherArgs<ExtArgs>
    offspringFromMother?: boolean | Animal$offspringFromMotherArgs<ExtArgs>
    owner?: boolean | UserDefaultArgs<ExtArgs>
    dewormings?: boolean | Animal$dewormingsArgs<ExtArgs>
    diseases?: boolean | Animal$diseasesArgs<ExtArgs>
    Notification?: boolean | Animal$NotificationArgs<ExtArgs>
    vaccines?: boolean | Animal$vaccinesArgs<ExtArgs>
    _count?: boolean | AnimalCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AnimalIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bull?: boolean | Animal$bullArgs<ExtArgs>
    father?: boolean | Animal$fatherArgs<ExtArgs>
    mother?: boolean | Animal$motherArgs<ExtArgs>
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AnimalIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bull?: boolean | Animal$bullArgs<ExtArgs>
    father?: boolean | Animal$fatherArgs<ExtArgs>
    mother?: boolean | Animal$motherArgs<ExtArgs>
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AnimalPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Animal"
    objects: {
      bull: Prisma.$AnimalPayload<ExtArgs> | null
      offspringFromBull: Prisma.$AnimalPayload<ExtArgs>[]
      father: Prisma.$AnimalPayload<ExtArgs> | null
      offspringFromFather: Prisma.$AnimalPayload<ExtArgs>[]
      mother: Prisma.$AnimalPayload<ExtArgs> | null
      offspringFromMother: Prisma.$AnimalPayload<ExtArgs>[]
      owner: Prisma.$UserPayload<ExtArgs>
      dewormings: Prisma.$DewormingPayload<ExtArgs>[]
      diseases: Prisma.$DiseasePayload<ExtArgs>[]
      Notification: Prisma.$NotificationPayload<ExtArgs>[]
      vaccines: Prisma.$VaccinePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      manualId: string
      gender: string
      birthDate: Date
      weight: number
      breed: string
      category: string
      motherId: string | null
      fatherId: string | null
      reproductiveStatus: string | null
      handlingType: string | null
      bullId: string | null
      protocol: string | null
      andrological: string | null
      expectedDueDate: Date | null
      fetalGender: string | null
      bullIatf: string | null
      bodyConditionScore: number | null
      observations: string | null
      ownerId: string
      createdAt: Date
      updatedAt: Date
      dewormingDate: Date | null
      dewormingExpiry: Date | null
      dewormingName: string | null
      status: string
      vaccineDate: Date | null
      vaccineExpiry: Date | null
      vaccineName: string | null
    }, ExtArgs["result"]["animal"]>
    composites: {}
  }

  type AnimalGetPayload<S extends boolean | null | undefined | AnimalDefaultArgs> = $Result.GetResult<Prisma.$AnimalPayload, S>

  type AnimalCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AnimalFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AnimalCountAggregateInputType | true
    }

  export interface AnimalDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Animal'], meta: { name: 'Animal' } }
    /**
     * Find zero or one Animal that matches the filter.
     * @param {AnimalFindUniqueArgs} args - Arguments to find a Animal
     * @example
     * // Get one Animal
     * const animal = await prisma.animal.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AnimalFindUniqueArgs>(args: SelectSubset<T, AnimalFindUniqueArgs<ExtArgs>>): Prisma__AnimalClient<$Result.GetResult<Prisma.$AnimalPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one Animal that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AnimalFindUniqueOrThrowArgs} args - Arguments to find a Animal
     * @example
     * // Get one Animal
     * const animal = await prisma.animal.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AnimalFindUniqueOrThrowArgs>(args: SelectSubset<T, AnimalFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AnimalClient<$Result.GetResult<Prisma.$AnimalPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first Animal that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnimalFindFirstArgs} args - Arguments to find a Animal
     * @example
     * // Get one Animal
     * const animal = await prisma.animal.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AnimalFindFirstArgs>(args?: SelectSubset<T, AnimalFindFirstArgs<ExtArgs>>): Prisma__AnimalClient<$Result.GetResult<Prisma.$AnimalPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first Animal that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnimalFindFirstOrThrowArgs} args - Arguments to find a Animal
     * @example
     * // Get one Animal
     * const animal = await prisma.animal.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AnimalFindFirstOrThrowArgs>(args?: SelectSubset<T, AnimalFindFirstOrThrowArgs<ExtArgs>>): Prisma__AnimalClient<$Result.GetResult<Prisma.$AnimalPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Animals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnimalFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Animals
     * const animals = await prisma.animal.findMany()
     * 
     * // Get first 10 Animals
     * const animals = await prisma.animal.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const animalWithIdOnly = await prisma.animal.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AnimalFindManyArgs>(args?: SelectSubset<T, AnimalFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnimalPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a Animal.
     * @param {AnimalCreateArgs} args - Arguments to create a Animal.
     * @example
     * // Create one Animal
     * const Animal = await prisma.animal.create({
     *   data: {
     *     // ... data to create a Animal
     *   }
     * })
     * 
     */
    create<T extends AnimalCreateArgs>(args: SelectSubset<T, AnimalCreateArgs<ExtArgs>>): Prisma__AnimalClient<$Result.GetResult<Prisma.$AnimalPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Animals.
     * @param {AnimalCreateManyArgs} args - Arguments to create many Animals.
     * @example
     * // Create many Animals
     * const animal = await prisma.animal.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AnimalCreateManyArgs>(args?: SelectSubset<T, AnimalCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Animals and returns the data saved in the database.
     * @param {AnimalCreateManyAndReturnArgs} args - Arguments to create many Animals.
     * @example
     * // Create many Animals
     * const animal = await prisma.animal.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Animals and only return the `id`
     * const animalWithIdOnly = await prisma.animal.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AnimalCreateManyAndReturnArgs>(args?: SelectSubset<T, AnimalCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnimalPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a Animal.
     * @param {AnimalDeleteArgs} args - Arguments to delete one Animal.
     * @example
     * // Delete one Animal
     * const Animal = await prisma.animal.delete({
     *   where: {
     *     // ... filter to delete one Animal
     *   }
     * })
     * 
     */
    delete<T extends AnimalDeleteArgs>(args: SelectSubset<T, AnimalDeleteArgs<ExtArgs>>): Prisma__AnimalClient<$Result.GetResult<Prisma.$AnimalPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one Animal.
     * @param {AnimalUpdateArgs} args - Arguments to update one Animal.
     * @example
     * // Update one Animal
     * const animal = await prisma.animal.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AnimalUpdateArgs>(args: SelectSubset<T, AnimalUpdateArgs<ExtArgs>>): Prisma__AnimalClient<$Result.GetResult<Prisma.$AnimalPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Animals.
     * @param {AnimalDeleteManyArgs} args - Arguments to filter Animals to delete.
     * @example
     * // Delete a few Animals
     * const { count } = await prisma.animal.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AnimalDeleteManyArgs>(args?: SelectSubset<T, AnimalDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Animals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnimalUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Animals
     * const animal = await prisma.animal.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AnimalUpdateManyArgs>(args: SelectSubset<T, AnimalUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Animals and returns the data updated in the database.
     * @param {AnimalUpdateManyAndReturnArgs} args - Arguments to update many Animals.
     * @example
     * // Update many Animals
     * const animal = await prisma.animal.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Animals and only return the `id`
     * const animalWithIdOnly = await prisma.animal.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AnimalUpdateManyAndReturnArgs>(args: SelectSubset<T, AnimalUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnimalPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one Animal.
     * @param {AnimalUpsertArgs} args - Arguments to update or create a Animal.
     * @example
     * // Update or create a Animal
     * const animal = await prisma.animal.upsert({
     *   create: {
     *     // ... data to create a Animal
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Animal we want to update
     *   }
     * })
     */
    upsert<T extends AnimalUpsertArgs>(args: SelectSubset<T, AnimalUpsertArgs<ExtArgs>>): Prisma__AnimalClient<$Result.GetResult<Prisma.$AnimalPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Animals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnimalCountArgs} args - Arguments to filter Animals to count.
     * @example
     * // Count the number of Animals
     * const count = await prisma.animal.count({
     *   where: {
     *     // ... the filter for the Animals we want to count
     *   }
     * })
    **/
    count<T extends AnimalCountArgs>(
      args?: Subset<T, AnimalCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AnimalCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Animal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnimalAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AnimalAggregateArgs>(args: Subset<T, AnimalAggregateArgs>): Prisma.PrismaPromise<GetAnimalAggregateType<T>>

    /**
     * Group by Animal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnimalGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AnimalGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AnimalGroupByArgs['orderBy'] }
        : { orderBy?: AnimalGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AnimalGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAnimalGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Animal model
   */
  readonly fields: AnimalFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Animal.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AnimalClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    bull<T extends Animal$bullArgs<ExtArgs> = {}>(args?: Subset<T, Animal$bullArgs<ExtArgs>>): Prisma__AnimalClient<$Result.GetResult<Prisma.$AnimalPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | null, null, ExtArgs, ClientOptions>
    offspringFromBull<T extends Animal$offspringFromBullArgs<ExtArgs> = {}>(args?: Subset<T, Animal$offspringFromBullArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnimalPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    father<T extends Animal$fatherArgs<ExtArgs> = {}>(args?: Subset<T, Animal$fatherArgs<ExtArgs>>): Prisma__AnimalClient<$Result.GetResult<Prisma.$AnimalPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | null, null, ExtArgs, ClientOptions>
    offspringFromFather<T extends Animal$offspringFromFatherArgs<ExtArgs> = {}>(args?: Subset<T, Animal$offspringFromFatherArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnimalPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    mother<T extends Animal$motherArgs<ExtArgs> = {}>(args?: Subset<T, Animal$motherArgs<ExtArgs>>): Prisma__AnimalClient<$Result.GetResult<Prisma.$AnimalPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | null, null, ExtArgs, ClientOptions>
    offspringFromMother<T extends Animal$offspringFromMotherArgs<ExtArgs> = {}>(args?: Subset<T, Animal$offspringFromMotherArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnimalPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    owner<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    dewormings<T extends Animal$dewormingsArgs<ExtArgs> = {}>(args?: Subset<T, Animal$dewormingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DewormingPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    diseases<T extends Animal$diseasesArgs<ExtArgs> = {}>(args?: Subset<T, Animal$diseasesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DiseasePayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    Notification<T extends Animal$NotificationArgs<ExtArgs> = {}>(args?: Subset<T, Animal$NotificationArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    vaccines<T extends Animal$vaccinesArgs<ExtArgs> = {}>(args?: Subset<T, Animal$vaccinesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VaccinePayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Animal model
   */ 
  interface AnimalFieldRefs {
    readonly id: FieldRef<"Animal", 'String'>
    readonly manualId: FieldRef<"Animal", 'String'>
    readonly gender: FieldRef<"Animal", 'String'>
    readonly birthDate: FieldRef<"Animal", 'DateTime'>
    readonly weight: FieldRef<"Animal", 'Float'>
    readonly breed: FieldRef<"Animal", 'String'>
    readonly category: FieldRef<"Animal", 'String'>
    readonly motherId: FieldRef<"Animal", 'String'>
    readonly fatherId: FieldRef<"Animal", 'String'>
    readonly reproductiveStatus: FieldRef<"Animal", 'String'>
    readonly handlingType: FieldRef<"Animal", 'String'>
    readonly bullId: FieldRef<"Animal", 'String'>
    readonly protocol: FieldRef<"Animal", 'String'>
    readonly andrological: FieldRef<"Animal", 'String'>
    readonly expectedDueDate: FieldRef<"Animal", 'DateTime'>
    readonly fetalGender: FieldRef<"Animal", 'String'>
    readonly bullIatf: FieldRef<"Animal", 'String'>
    readonly bodyConditionScore: FieldRef<"Animal", 'Float'>
    readonly observations: FieldRef<"Animal", 'String'>
    readonly ownerId: FieldRef<"Animal", 'String'>
    readonly createdAt: FieldRef<"Animal", 'DateTime'>
    readonly updatedAt: FieldRef<"Animal", 'DateTime'>
    readonly dewormingDate: FieldRef<"Animal", 'DateTime'>
    readonly dewormingExpiry: FieldRef<"Animal", 'DateTime'>
    readonly dewormingName: FieldRef<"Animal", 'String'>
    readonly status: FieldRef<"Animal", 'String'>
    readonly vaccineDate: FieldRef<"Animal", 'DateTime'>
    readonly vaccineExpiry: FieldRef<"Animal", 'DateTime'>
    readonly vaccineName: FieldRef<"Animal", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Animal findUnique
   */
  export type AnimalFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Animal
     */
    select?: AnimalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Animal
     */
    omit?: AnimalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimalInclude<ExtArgs> | null
    /**
     * Filter, which Animal to fetch.
     */
    where: AnimalWhereUniqueInput
  }

  /**
   * Animal findUniqueOrThrow
   */
  export type AnimalFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Animal
     */
    select?: AnimalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Animal
     */
    omit?: AnimalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimalInclude<ExtArgs> | null
    /**
     * Filter, which Animal to fetch.
     */
    where: AnimalWhereUniqueInput
  }

  /**
   * Animal findFirst
   */
  export type AnimalFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Animal
     */
    select?: AnimalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Animal
     */
    omit?: AnimalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimalInclude<ExtArgs> | null
    /**
     * Filter, which Animal to fetch.
     */
    where?: AnimalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Animals to fetch.
     */
    orderBy?: AnimalOrderByWithRelationInput | AnimalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Animals.
     */
    cursor?: AnimalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Animals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Animals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Animals.
     */
    distinct?: AnimalScalarFieldEnum | AnimalScalarFieldEnum[]
  }

  /**
   * Animal findFirstOrThrow
   */
  export type AnimalFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Animal
     */
    select?: AnimalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Animal
     */
    omit?: AnimalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimalInclude<ExtArgs> | null
    /**
     * Filter, which Animal to fetch.
     */
    where?: AnimalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Animals to fetch.
     */
    orderBy?: AnimalOrderByWithRelationInput | AnimalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Animals.
     */
    cursor?: AnimalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Animals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Animals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Animals.
     */
    distinct?: AnimalScalarFieldEnum | AnimalScalarFieldEnum[]
  }

  /**
   * Animal findMany
   */
  export type AnimalFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Animal
     */
    select?: AnimalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Animal
     */
    omit?: AnimalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimalInclude<ExtArgs> | null
    /**
     * Filter, which Animals to fetch.
     */
    where?: AnimalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Animals to fetch.
     */
    orderBy?: AnimalOrderByWithRelationInput | AnimalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Animals.
     */
    cursor?: AnimalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Animals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Animals.
     */
    skip?: number
    distinct?: AnimalScalarFieldEnum | AnimalScalarFieldEnum[]
  }

  /**
   * Animal create
   */
  export type AnimalCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Animal
     */
    select?: AnimalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Animal
     */
    omit?: AnimalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimalInclude<ExtArgs> | null
    /**
     * The data needed to create a Animal.
     */
    data: XOR<AnimalCreateInput, AnimalUncheckedCreateInput>
  }

  /**
   * Animal createMany
   */
  export type AnimalCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Animals.
     */
    data: AnimalCreateManyInput | AnimalCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Animal createManyAndReturn
   */
  export type AnimalCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Animal
     */
    select?: AnimalSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Animal
     */
    omit?: AnimalOmit<ExtArgs> | null
    /**
     * The data used to create many Animals.
     */
    data: AnimalCreateManyInput | AnimalCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimalIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Animal update
   */
  export type AnimalUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Animal
     */
    select?: AnimalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Animal
     */
    omit?: AnimalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimalInclude<ExtArgs> | null
    /**
     * The data needed to update a Animal.
     */
    data: XOR<AnimalUpdateInput, AnimalUncheckedUpdateInput>
    /**
     * Choose, which Animal to update.
     */
    where: AnimalWhereUniqueInput
  }

  /**
   * Animal updateMany
   */
  export type AnimalUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Animals.
     */
    data: XOR<AnimalUpdateManyMutationInput, AnimalUncheckedUpdateManyInput>
    /**
     * Filter which Animals to update
     */
    where?: AnimalWhereInput
    /**
     * Limit how many Animals to update.
     */
    limit?: number
  }

  /**
   * Animal updateManyAndReturn
   */
  export type AnimalUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Animal
     */
    select?: AnimalSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Animal
     */
    omit?: AnimalOmit<ExtArgs> | null
    /**
     * The data used to update Animals.
     */
    data: XOR<AnimalUpdateManyMutationInput, AnimalUncheckedUpdateManyInput>
    /**
     * Filter which Animals to update
     */
    where?: AnimalWhereInput
    /**
     * Limit how many Animals to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimalIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Animal upsert
   */
  export type AnimalUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Animal
     */
    select?: AnimalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Animal
     */
    omit?: AnimalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimalInclude<ExtArgs> | null
    /**
     * The filter to search for the Animal to update in case it exists.
     */
    where: AnimalWhereUniqueInput
    /**
     * In case the Animal found by the `where` argument doesn't exist, create a new Animal with this data.
     */
    create: XOR<AnimalCreateInput, AnimalUncheckedCreateInput>
    /**
     * In case the Animal was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AnimalUpdateInput, AnimalUncheckedUpdateInput>
  }

  /**
   * Animal delete
   */
  export type AnimalDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Animal
     */
    select?: AnimalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Animal
     */
    omit?: AnimalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimalInclude<ExtArgs> | null
    /**
     * Filter which Animal to delete.
     */
    where: AnimalWhereUniqueInput
  }

  /**
   * Animal deleteMany
   */
  export type AnimalDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Animals to delete
     */
    where?: AnimalWhereInput
    /**
     * Limit how many Animals to delete.
     */
    limit?: number
  }

  /**
   * Animal.bull
   */
  export type Animal$bullArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Animal
     */
    select?: AnimalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Animal
     */
    omit?: AnimalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimalInclude<ExtArgs> | null
    where?: AnimalWhereInput
  }

  /**
   * Animal.offspringFromBull
   */
  export type Animal$offspringFromBullArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Animal
     */
    select?: AnimalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Animal
     */
    omit?: AnimalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimalInclude<ExtArgs> | null
    where?: AnimalWhereInput
    orderBy?: AnimalOrderByWithRelationInput | AnimalOrderByWithRelationInput[]
    cursor?: AnimalWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AnimalScalarFieldEnum | AnimalScalarFieldEnum[]
  }

  /**
   * Animal.father
   */
  export type Animal$fatherArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Animal
     */
    select?: AnimalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Animal
     */
    omit?: AnimalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimalInclude<ExtArgs> | null
    where?: AnimalWhereInput
  }

  /**
   * Animal.offspringFromFather
   */
  export type Animal$offspringFromFatherArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Animal
     */
    select?: AnimalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Animal
     */
    omit?: AnimalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimalInclude<ExtArgs> | null
    where?: AnimalWhereInput
    orderBy?: AnimalOrderByWithRelationInput | AnimalOrderByWithRelationInput[]
    cursor?: AnimalWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AnimalScalarFieldEnum | AnimalScalarFieldEnum[]
  }

  /**
   * Animal.mother
   */
  export type Animal$motherArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Animal
     */
    select?: AnimalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Animal
     */
    omit?: AnimalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimalInclude<ExtArgs> | null
    where?: AnimalWhereInput
  }

  /**
   * Animal.offspringFromMother
   */
  export type Animal$offspringFromMotherArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Animal
     */
    select?: AnimalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Animal
     */
    omit?: AnimalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimalInclude<ExtArgs> | null
    where?: AnimalWhereInput
    orderBy?: AnimalOrderByWithRelationInput | AnimalOrderByWithRelationInput[]
    cursor?: AnimalWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AnimalScalarFieldEnum | AnimalScalarFieldEnum[]
  }

  /**
   * Animal.dewormings
   */
  export type Animal$dewormingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deworming
     */
    select?: DewormingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deworming
     */
    omit?: DewormingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DewormingInclude<ExtArgs> | null
    where?: DewormingWhereInput
    orderBy?: DewormingOrderByWithRelationInput | DewormingOrderByWithRelationInput[]
    cursor?: DewormingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DewormingScalarFieldEnum | DewormingScalarFieldEnum[]
  }

  /**
   * Animal.diseases
   */
  export type Animal$diseasesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Disease
     */
    select?: DiseaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Disease
     */
    omit?: DiseaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiseaseInclude<ExtArgs> | null
    where?: DiseaseWhereInput
    orderBy?: DiseaseOrderByWithRelationInput | DiseaseOrderByWithRelationInput[]
    cursor?: DiseaseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DiseaseScalarFieldEnum | DiseaseScalarFieldEnum[]
  }

  /**
   * Animal.Notification
   */
  export type Animal$NotificationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    cursor?: NotificationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Animal.vaccines
   */
  export type Animal$vaccinesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vaccine
     */
    select?: VaccineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vaccine
     */
    omit?: VaccineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VaccineInclude<ExtArgs> | null
    where?: VaccineWhereInput
    orderBy?: VaccineOrderByWithRelationInput | VaccineOrderByWithRelationInput[]
    cursor?: VaccineWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VaccineScalarFieldEnum | VaccineScalarFieldEnum[]
  }

  /**
   * Animal without action
   */
  export type AnimalDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Animal
     */
    select?: AnimalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Animal
     */
    omit?: AnimalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimalInclude<ExtArgs> | null
  }


  /**
   * Model Disease
   */

  export type AggregateDisease = {
    _count: DiseaseCountAggregateOutputType | null
    _min: DiseaseMinAggregateOutputType | null
    _max: DiseaseMaxAggregateOutputType | null
  }

  export type DiseaseMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    date: Date | null
    animalId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DiseaseMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    date: Date | null
    animalId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DiseaseCountAggregateOutputType = {
    id: number
    name: number
    description: number
    date: number
    animalId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DiseaseMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    date?: true
    animalId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DiseaseMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    date?: true
    animalId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DiseaseCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    date?: true
    animalId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DiseaseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Disease to aggregate.
     */
    where?: DiseaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Diseases to fetch.
     */
    orderBy?: DiseaseOrderByWithRelationInput | DiseaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DiseaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Diseases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Diseases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Diseases
    **/
    _count?: true | DiseaseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DiseaseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DiseaseMaxAggregateInputType
  }

  export type GetDiseaseAggregateType<T extends DiseaseAggregateArgs> = {
        [P in keyof T & keyof AggregateDisease]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDisease[P]>
      : GetScalarType<T[P], AggregateDisease[P]>
  }




  export type DiseaseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DiseaseWhereInput
    orderBy?: DiseaseOrderByWithAggregationInput | DiseaseOrderByWithAggregationInput[]
    by: DiseaseScalarFieldEnum[] | DiseaseScalarFieldEnum
    having?: DiseaseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DiseaseCountAggregateInputType | true
    _min?: DiseaseMinAggregateInputType
    _max?: DiseaseMaxAggregateInputType
  }

  export type DiseaseGroupByOutputType = {
    id: string
    name: string
    description: string | null
    date: Date
    animalId: string
    createdAt: Date
    updatedAt: Date
    _count: DiseaseCountAggregateOutputType | null
    _min: DiseaseMinAggregateOutputType | null
    _max: DiseaseMaxAggregateOutputType | null
  }

  type GetDiseaseGroupByPayload<T extends DiseaseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DiseaseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DiseaseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DiseaseGroupByOutputType[P]>
            : GetScalarType<T[P], DiseaseGroupByOutputType[P]>
        }
      >
    >


  export type DiseaseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    date?: boolean
    animalId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    animal?: boolean | AnimalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["disease"]>

  export type DiseaseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    date?: boolean
    animalId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    animal?: boolean | AnimalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["disease"]>

  export type DiseaseSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    date?: boolean
    animalId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    animal?: boolean | AnimalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["disease"]>

  export type DiseaseSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    date?: boolean
    animalId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DiseaseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "date" | "animalId" | "createdAt" | "updatedAt", ExtArgs["result"]["disease"]>
  export type DiseaseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    animal?: boolean | AnimalDefaultArgs<ExtArgs>
  }
  export type DiseaseIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    animal?: boolean | AnimalDefaultArgs<ExtArgs>
  }
  export type DiseaseIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    animal?: boolean | AnimalDefaultArgs<ExtArgs>
  }

  export type $DiseasePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Disease"
    objects: {
      animal: Prisma.$AnimalPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      date: Date
      animalId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["disease"]>
    composites: {}
  }

  type DiseaseGetPayload<S extends boolean | null | undefined | DiseaseDefaultArgs> = $Result.GetResult<Prisma.$DiseasePayload, S>

  type DiseaseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DiseaseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DiseaseCountAggregateInputType | true
    }

  export interface DiseaseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Disease'], meta: { name: 'Disease' } }
    /**
     * Find zero or one Disease that matches the filter.
     * @param {DiseaseFindUniqueArgs} args - Arguments to find a Disease
     * @example
     * // Get one Disease
     * const disease = await prisma.disease.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DiseaseFindUniqueArgs>(args: SelectSubset<T, DiseaseFindUniqueArgs<ExtArgs>>): Prisma__DiseaseClient<$Result.GetResult<Prisma.$DiseasePayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one Disease that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DiseaseFindUniqueOrThrowArgs} args - Arguments to find a Disease
     * @example
     * // Get one Disease
     * const disease = await prisma.disease.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DiseaseFindUniqueOrThrowArgs>(args: SelectSubset<T, DiseaseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DiseaseClient<$Result.GetResult<Prisma.$DiseasePayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first Disease that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiseaseFindFirstArgs} args - Arguments to find a Disease
     * @example
     * // Get one Disease
     * const disease = await prisma.disease.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DiseaseFindFirstArgs>(args?: SelectSubset<T, DiseaseFindFirstArgs<ExtArgs>>): Prisma__DiseaseClient<$Result.GetResult<Prisma.$DiseasePayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first Disease that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiseaseFindFirstOrThrowArgs} args - Arguments to find a Disease
     * @example
     * // Get one Disease
     * const disease = await prisma.disease.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DiseaseFindFirstOrThrowArgs>(args?: SelectSubset<T, DiseaseFindFirstOrThrowArgs<ExtArgs>>): Prisma__DiseaseClient<$Result.GetResult<Prisma.$DiseasePayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Diseases that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiseaseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Diseases
     * const diseases = await prisma.disease.findMany()
     * 
     * // Get first 10 Diseases
     * const diseases = await prisma.disease.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const diseaseWithIdOnly = await prisma.disease.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DiseaseFindManyArgs>(args?: SelectSubset<T, DiseaseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DiseasePayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a Disease.
     * @param {DiseaseCreateArgs} args - Arguments to create a Disease.
     * @example
     * // Create one Disease
     * const Disease = await prisma.disease.create({
     *   data: {
     *     // ... data to create a Disease
     *   }
     * })
     * 
     */
    create<T extends DiseaseCreateArgs>(args: SelectSubset<T, DiseaseCreateArgs<ExtArgs>>): Prisma__DiseaseClient<$Result.GetResult<Prisma.$DiseasePayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Diseases.
     * @param {DiseaseCreateManyArgs} args - Arguments to create many Diseases.
     * @example
     * // Create many Diseases
     * const disease = await prisma.disease.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DiseaseCreateManyArgs>(args?: SelectSubset<T, DiseaseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Diseases and returns the data saved in the database.
     * @param {DiseaseCreateManyAndReturnArgs} args - Arguments to create many Diseases.
     * @example
     * // Create many Diseases
     * const disease = await prisma.disease.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Diseases and only return the `id`
     * const diseaseWithIdOnly = await prisma.disease.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DiseaseCreateManyAndReturnArgs>(args?: SelectSubset<T, DiseaseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DiseasePayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a Disease.
     * @param {DiseaseDeleteArgs} args - Arguments to delete one Disease.
     * @example
     * // Delete one Disease
     * const Disease = await prisma.disease.delete({
     *   where: {
     *     // ... filter to delete one Disease
     *   }
     * })
     * 
     */
    delete<T extends DiseaseDeleteArgs>(args: SelectSubset<T, DiseaseDeleteArgs<ExtArgs>>): Prisma__DiseaseClient<$Result.GetResult<Prisma.$DiseasePayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one Disease.
     * @param {DiseaseUpdateArgs} args - Arguments to update one Disease.
     * @example
     * // Update one Disease
     * const disease = await prisma.disease.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DiseaseUpdateArgs>(args: SelectSubset<T, DiseaseUpdateArgs<ExtArgs>>): Prisma__DiseaseClient<$Result.GetResult<Prisma.$DiseasePayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Diseases.
     * @param {DiseaseDeleteManyArgs} args - Arguments to filter Diseases to delete.
     * @example
     * // Delete a few Diseases
     * const { count } = await prisma.disease.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DiseaseDeleteManyArgs>(args?: SelectSubset<T, DiseaseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Diseases.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiseaseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Diseases
     * const disease = await prisma.disease.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DiseaseUpdateManyArgs>(args: SelectSubset<T, DiseaseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Diseases and returns the data updated in the database.
     * @param {DiseaseUpdateManyAndReturnArgs} args - Arguments to update many Diseases.
     * @example
     * // Update many Diseases
     * const disease = await prisma.disease.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Diseases and only return the `id`
     * const diseaseWithIdOnly = await prisma.disease.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DiseaseUpdateManyAndReturnArgs>(args: SelectSubset<T, DiseaseUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DiseasePayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one Disease.
     * @param {DiseaseUpsertArgs} args - Arguments to update or create a Disease.
     * @example
     * // Update or create a Disease
     * const disease = await prisma.disease.upsert({
     *   create: {
     *     // ... data to create a Disease
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Disease we want to update
     *   }
     * })
     */
    upsert<T extends DiseaseUpsertArgs>(args: SelectSubset<T, DiseaseUpsertArgs<ExtArgs>>): Prisma__DiseaseClient<$Result.GetResult<Prisma.$DiseasePayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Diseases.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiseaseCountArgs} args - Arguments to filter Diseases to count.
     * @example
     * // Count the number of Diseases
     * const count = await prisma.disease.count({
     *   where: {
     *     // ... the filter for the Diseases we want to count
     *   }
     * })
    **/
    count<T extends DiseaseCountArgs>(
      args?: Subset<T, DiseaseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DiseaseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Disease.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiseaseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DiseaseAggregateArgs>(args: Subset<T, DiseaseAggregateArgs>): Prisma.PrismaPromise<GetDiseaseAggregateType<T>>

    /**
     * Group by Disease.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiseaseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DiseaseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DiseaseGroupByArgs['orderBy'] }
        : { orderBy?: DiseaseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DiseaseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDiseaseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Disease model
   */
  readonly fields: DiseaseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Disease.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DiseaseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    animal<T extends AnimalDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AnimalDefaultArgs<ExtArgs>>): Prisma__AnimalClient<$Result.GetResult<Prisma.$AnimalPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Disease model
   */ 
  interface DiseaseFieldRefs {
    readonly id: FieldRef<"Disease", 'String'>
    readonly name: FieldRef<"Disease", 'String'>
    readonly description: FieldRef<"Disease", 'String'>
    readonly date: FieldRef<"Disease", 'DateTime'>
    readonly animalId: FieldRef<"Disease", 'String'>
    readonly createdAt: FieldRef<"Disease", 'DateTime'>
    readonly updatedAt: FieldRef<"Disease", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Disease findUnique
   */
  export type DiseaseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Disease
     */
    select?: DiseaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Disease
     */
    omit?: DiseaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiseaseInclude<ExtArgs> | null
    /**
     * Filter, which Disease to fetch.
     */
    where: DiseaseWhereUniqueInput
  }

  /**
   * Disease findUniqueOrThrow
   */
  export type DiseaseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Disease
     */
    select?: DiseaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Disease
     */
    omit?: DiseaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiseaseInclude<ExtArgs> | null
    /**
     * Filter, which Disease to fetch.
     */
    where: DiseaseWhereUniqueInput
  }

  /**
   * Disease findFirst
   */
  export type DiseaseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Disease
     */
    select?: DiseaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Disease
     */
    omit?: DiseaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiseaseInclude<ExtArgs> | null
    /**
     * Filter, which Disease to fetch.
     */
    where?: DiseaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Diseases to fetch.
     */
    orderBy?: DiseaseOrderByWithRelationInput | DiseaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Diseases.
     */
    cursor?: DiseaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Diseases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Diseases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Diseases.
     */
    distinct?: DiseaseScalarFieldEnum | DiseaseScalarFieldEnum[]
  }

  /**
   * Disease findFirstOrThrow
   */
  export type DiseaseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Disease
     */
    select?: DiseaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Disease
     */
    omit?: DiseaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiseaseInclude<ExtArgs> | null
    /**
     * Filter, which Disease to fetch.
     */
    where?: DiseaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Diseases to fetch.
     */
    orderBy?: DiseaseOrderByWithRelationInput | DiseaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Diseases.
     */
    cursor?: DiseaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Diseases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Diseases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Diseases.
     */
    distinct?: DiseaseScalarFieldEnum | DiseaseScalarFieldEnum[]
  }

  /**
   * Disease findMany
   */
  export type DiseaseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Disease
     */
    select?: DiseaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Disease
     */
    omit?: DiseaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiseaseInclude<ExtArgs> | null
    /**
     * Filter, which Diseases to fetch.
     */
    where?: DiseaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Diseases to fetch.
     */
    orderBy?: DiseaseOrderByWithRelationInput | DiseaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Diseases.
     */
    cursor?: DiseaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Diseases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Diseases.
     */
    skip?: number
    distinct?: DiseaseScalarFieldEnum | DiseaseScalarFieldEnum[]
  }

  /**
   * Disease create
   */
  export type DiseaseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Disease
     */
    select?: DiseaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Disease
     */
    omit?: DiseaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiseaseInclude<ExtArgs> | null
    /**
     * The data needed to create a Disease.
     */
    data: XOR<DiseaseCreateInput, DiseaseUncheckedCreateInput>
  }

  /**
   * Disease createMany
   */
  export type DiseaseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Diseases.
     */
    data: DiseaseCreateManyInput | DiseaseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Disease createManyAndReturn
   */
  export type DiseaseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Disease
     */
    select?: DiseaseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Disease
     */
    omit?: DiseaseOmit<ExtArgs> | null
    /**
     * The data used to create many Diseases.
     */
    data: DiseaseCreateManyInput | DiseaseCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiseaseIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Disease update
   */
  export type DiseaseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Disease
     */
    select?: DiseaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Disease
     */
    omit?: DiseaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiseaseInclude<ExtArgs> | null
    /**
     * The data needed to update a Disease.
     */
    data: XOR<DiseaseUpdateInput, DiseaseUncheckedUpdateInput>
    /**
     * Choose, which Disease to update.
     */
    where: DiseaseWhereUniqueInput
  }

  /**
   * Disease updateMany
   */
  export type DiseaseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Diseases.
     */
    data: XOR<DiseaseUpdateManyMutationInput, DiseaseUncheckedUpdateManyInput>
    /**
     * Filter which Diseases to update
     */
    where?: DiseaseWhereInput
    /**
     * Limit how many Diseases to update.
     */
    limit?: number
  }

  /**
   * Disease updateManyAndReturn
   */
  export type DiseaseUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Disease
     */
    select?: DiseaseSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Disease
     */
    omit?: DiseaseOmit<ExtArgs> | null
    /**
     * The data used to update Diseases.
     */
    data: XOR<DiseaseUpdateManyMutationInput, DiseaseUncheckedUpdateManyInput>
    /**
     * Filter which Diseases to update
     */
    where?: DiseaseWhereInput
    /**
     * Limit how many Diseases to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiseaseIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Disease upsert
   */
  export type DiseaseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Disease
     */
    select?: DiseaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Disease
     */
    omit?: DiseaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiseaseInclude<ExtArgs> | null
    /**
     * The filter to search for the Disease to update in case it exists.
     */
    where: DiseaseWhereUniqueInput
    /**
     * In case the Disease found by the `where` argument doesn't exist, create a new Disease with this data.
     */
    create: XOR<DiseaseCreateInput, DiseaseUncheckedCreateInput>
    /**
     * In case the Disease was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DiseaseUpdateInput, DiseaseUncheckedUpdateInput>
  }

  /**
   * Disease delete
   */
  export type DiseaseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Disease
     */
    select?: DiseaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Disease
     */
    omit?: DiseaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiseaseInclude<ExtArgs> | null
    /**
     * Filter which Disease to delete.
     */
    where: DiseaseWhereUniqueInput
  }

  /**
   * Disease deleteMany
   */
  export type DiseaseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Diseases to delete
     */
    where?: DiseaseWhereInput
    /**
     * Limit how many Diseases to delete.
     */
    limit?: number
  }

  /**
   * Disease without action
   */
  export type DiseaseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Disease
     */
    select?: DiseaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Disease
     */
    omit?: DiseaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiseaseInclude<ExtArgs> | null
  }


  /**
   * Model Vaccine
   */

  export type AggregateVaccine = {
    _count: VaccineCountAggregateOutputType | null
    _min: VaccineMinAggregateOutputType | null
    _max: VaccineMaxAggregateOutputType | null
  }

  export type VaccineMinAggregateOutputType = {
    name: string | null
    description: string | null
    date: Date | null
    animalId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    expiryDate: Date | null
    id: string | null
  }

  export type VaccineMaxAggregateOutputType = {
    name: string | null
    description: string | null
    date: Date | null
    animalId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    expiryDate: Date | null
    id: string | null
  }

  export type VaccineCountAggregateOutputType = {
    name: number
    description: number
    date: number
    animalId: number
    createdAt: number
    updatedAt: number
    expiryDate: number
    id: number
    _all: number
  }


  export type VaccineMinAggregateInputType = {
    name?: true
    description?: true
    date?: true
    animalId?: true
    createdAt?: true
    updatedAt?: true
    expiryDate?: true
    id?: true
  }

  export type VaccineMaxAggregateInputType = {
    name?: true
    description?: true
    date?: true
    animalId?: true
    createdAt?: true
    updatedAt?: true
    expiryDate?: true
    id?: true
  }

  export type VaccineCountAggregateInputType = {
    name?: true
    description?: true
    date?: true
    animalId?: true
    createdAt?: true
    updatedAt?: true
    expiryDate?: true
    id?: true
    _all?: true
  }

  export type VaccineAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Vaccine to aggregate.
     */
    where?: VaccineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vaccines to fetch.
     */
    orderBy?: VaccineOrderByWithRelationInput | VaccineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VaccineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vaccines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vaccines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Vaccines
    **/
    _count?: true | VaccineCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VaccineMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VaccineMaxAggregateInputType
  }

  export type GetVaccineAggregateType<T extends VaccineAggregateArgs> = {
        [P in keyof T & keyof AggregateVaccine]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVaccine[P]>
      : GetScalarType<T[P], AggregateVaccine[P]>
  }




  export type VaccineGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VaccineWhereInput
    orderBy?: VaccineOrderByWithAggregationInput | VaccineOrderByWithAggregationInput[]
    by: VaccineScalarFieldEnum[] | VaccineScalarFieldEnum
    having?: VaccineScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VaccineCountAggregateInputType | true
    _min?: VaccineMinAggregateInputType
    _max?: VaccineMaxAggregateInputType
  }

  export type VaccineGroupByOutputType = {
    name: string
    description: string | null
    date: Date
    animalId: string
    createdAt: Date
    updatedAt: Date
    expiryDate: Date
    id: string
    _count: VaccineCountAggregateOutputType | null
    _min: VaccineMinAggregateOutputType | null
    _max: VaccineMaxAggregateOutputType | null
  }

  type GetVaccineGroupByPayload<T extends VaccineGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VaccineGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VaccineGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VaccineGroupByOutputType[P]>
            : GetScalarType<T[P], VaccineGroupByOutputType[P]>
        }
      >
    >


  export type VaccineSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    name?: boolean
    description?: boolean
    date?: boolean
    animalId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    expiryDate?: boolean
    id?: boolean
    animal?: boolean | AnimalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vaccine"]>

  export type VaccineSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    name?: boolean
    description?: boolean
    date?: boolean
    animalId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    expiryDate?: boolean
    id?: boolean
    animal?: boolean | AnimalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vaccine"]>

  export type VaccineSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    name?: boolean
    description?: boolean
    date?: boolean
    animalId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    expiryDate?: boolean
    id?: boolean
    animal?: boolean | AnimalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vaccine"]>

  export type VaccineSelectScalar = {
    name?: boolean
    description?: boolean
    date?: boolean
    animalId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    expiryDate?: boolean
    id?: boolean
  }

  export type VaccineOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"name" | "description" | "date" | "animalId" | "createdAt" | "updatedAt" | "expiryDate" | "id", ExtArgs["result"]["vaccine"]>
  export type VaccineInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    animal?: boolean | AnimalDefaultArgs<ExtArgs>
  }
  export type VaccineIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    animal?: boolean | AnimalDefaultArgs<ExtArgs>
  }
  export type VaccineIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    animal?: boolean | AnimalDefaultArgs<ExtArgs>
  }

  export type $VaccinePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Vaccine"
    objects: {
      animal: Prisma.$AnimalPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      name: string
      description: string | null
      date: Date
      animalId: string
      createdAt: Date
      updatedAt: Date
      expiryDate: Date
      id: string
    }, ExtArgs["result"]["vaccine"]>
    composites: {}
  }

  type VaccineGetPayload<S extends boolean | null | undefined | VaccineDefaultArgs> = $Result.GetResult<Prisma.$VaccinePayload, S>

  type VaccineCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VaccineFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VaccineCountAggregateInputType | true
    }

  export interface VaccineDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Vaccine'], meta: { name: 'Vaccine' } }
    /**
     * Find zero or one Vaccine that matches the filter.
     * @param {VaccineFindUniqueArgs} args - Arguments to find a Vaccine
     * @example
     * // Get one Vaccine
     * const vaccine = await prisma.vaccine.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VaccineFindUniqueArgs>(args: SelectSubset<T, VaccineFindUniqueArgs<ExtArgs>>): Prisma__VaccineClient<$Result.GetResult<Prisma.$VaccinePayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one Vaccine that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VaccineFindUniqueOrThrowArgs} args - Arguments to find a Vaccine
     * @example
     * // Get one Vaccine
     * const vaccine = await prisma.vaccine.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VaccineFindUniqueOrThrowArgs>(args: SelectSubset<T, VaccineFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VaccineClient<$Result.GetResult<Prisma.$VaccinePayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first Vaccine that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VaccineFindFirstArgs} args - Arguments to find a Vaccine
     * @example
     * // Get one Vaccine
     * const vaccine = await prisma.vaccine.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VaccineFindFirstArgs>(args?: SelectSubset<T, VaccineFindFirstArgs<ExtArgs>>): Prisma__VaccineClient<$Result.GetResult<Prisma.$VaccinePayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first Vaccine that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VaccineFindFirstOrThrowArgs} args - Arguments to find a Vaccine
     * @example
     * // Get one Vaccine
     * const vaccine = await prisma.vaccine.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VaccineFindFirstOrThrowArgs>(args?: SelectSubset<T, VaccineFindFirstOrThrowArgs<ExtArgs>>): Prisma__VaccineClient<$Result.GetResult<Prisma.$VaccinePayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Vaccines that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VaccineFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Vaccines
     * const vaccines = await prisma.vaccine.findMany()
     * 
     * // Get first 10 Vaccines
     * const vaccines = await prisma.vaccine.findMany({ take: 10 })
     * 
     * // Only select the `name`
     * const vaccineWithNameOnly = await prisma.vaccine.findMany({ select: { name: true } })
     * 
     */
    findMany<T extends VaccineFindManyArgs>(args?: SelectSubset<T, VaccineFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VaccinePayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a Vaccine.
     * @param {VaccineCreateArgs} args - Arguments to create a Vaccine.
     * @example
     * // Create one Vaccine
     * const Vaccine = await prisma.vaccine.create({
     *   data: {
     *     // ... data to create a Vaccine
     *   }
     * })
     * 
     */
    create<T extends VaccineCreateArgs>(args: SelectSubset<T, VaccineCreateArgs<ExtArgs>>): Prisma__VaccineClient<$Result.GetResult<Prisma.$VaccinePayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Vaccines.
     * @param {VaccineCreateManyArgs} args - Arguments to create many Vaccines.
     * @example
     * // Create many Vaccines
     * const vaccine = await prisma.vaccine.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VaccineCreateManyArgs>(args?: SelectSubset<T, VaccineCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Vaccines and returns the data saved in the database.
     * @param {VaccineCreateManyAndReturnArgs} args - Arguments to create many Vaccines.
     * @example
     * // Create many Vaccines
     * const vaccine = await prisma.vaccine.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Vaccines and only return the `name`
     * const vaccineWithNameOnly = await prisma.vaccine.createManyAndReturn({
     *   select: { name: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VaccineCreateManyAndReturnArgs>(args?: SelectSubset<T, VaccineCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VaccinePayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a Vaccine.
     * @param {VaccineDeleteArgs} args - Arguments to delete one Vaccine.
     * @example
     * // Delete one Vaccine
     * const Vaccine = await prisma.vaccine.delete({
     *   where: {
     *     // ... filter to delete one Vaccine
     *   }
     * })
     * 
     */
    delete<T extends VaccineDeleteArgs>(args: SelectSubset<T, VaccineDeleteArgs<ExtArgs>>): Prisma__VaccineClient<$Result.GetResult<Prisma.$VaccinePayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one Vaccine.
     * @param {VaccineUpdateArgs} args - Arguments to update one Vaccine.
     * @example
     * // Update one Vaccine
     * const vaccine = await prisma.vaccine.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VaccineUpdateArgs>(args: SelectSubset<T, VaccineUpdateArgs<ExtArgs>>): Prisma__VaccineClient<$Result.GetResult<Prisma.$VaccinePayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Vaccines.
     * @param {VaccineDeleteManyArgs} args - Arguments to filter Vaccines to delete.
     * @example
     * // Delete a few Vaccines
     * const { count } = await prisma.vaccine.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VaccineDeleteManyArgs>(args?: SelectSubset<T, VaccineDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Vaccines.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VaccineUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Vaccines
     * const vaccine = await prisma.vaccine.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VaccineUpdateManyArgs>(args: SelectSubset<T, VaccineUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Vaccines and returns the data updated in the database.
     * @param {VaccineUpdateManyAndReturnArgs} args - Arguments to update many Vaccines.
     * @example
     * // Update many Vaccines
     * const vaccine = await prisma.vaccine.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Vaccines and only return the `name`
     * const vaccineWithNameOnly = await prisma.vaccine.updateManyAndReturn({
     *   select: { name: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VaccineUpdateManyAndReturnArgs>(args: SelectSubset<T, VaccineUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VaccinePayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one Vaccine.
     * @param {VaccineUpsertArgs} args - Arguments to update or create a Vaccine.
     * @example
     * // Update or create a Vaccine
     * const vaccine = await prisma.vaccine.upsert({
     *   create: {
     *     // ... data to create a Vaccine
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Vaccine we want to update
     *   }
     * })
     */
    upsert<T extends VaccineUpsertArgs>(args: SelectSubset<T, VaccineUpsertArgs<ExtArgs>>): Prisma__VaccineClient<$Result.GetResult<Prisma.$VaccinePayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Vaccines.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VaccineCountArgs} args - Arguments to filter Vaccines to count.
     * @example
     * // Count the number of Vaccines
     * const count = await prisma.vaccine.count({
     *   where: {
     *     // ... the filter for the Vaccines we want to count
     *   }
     * })
    **/
    count<T extends VaccineCountArgs>(
      args?: Subset<T, VaccineCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VaccineCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Vaccine.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VaccineAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VaccineAggregateArgs>(args: Subset<T, VaccineAggregateArgs>): Prisma.PrismaPromise<GetVaccineAggregateType<T>>

    /**
     * Group by Vaccine.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VaccineGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VaccineGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VaccineGroupByArgs['orderBy'] }
        : { orderBy?: VaccineGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VaccineGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVaccineGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Vaccine model
   */
  readonly fields: VaccineFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Vaccine.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VaccineClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    animal<T extends AnimalDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AnimalDefaultArgs<ExtArgs>>): Prisma__AnimalClient<$Result.GetResult<Prisma.$AnimalPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Vaccine model
   */ 
  interface VaccineFieldRefs {
    readonly name: FieldRef<"Vaccine", 'String'>
    readonly description: FieldRef<"Vaccine", 'String'>
    readonly date: FieldRef<"Vaccine", 'DateTime'>
    readonly animalId: FieldRef<"Vaccine", 'String'>
    readonly createdAt: FieldRef<"Vaccine", 'DateTime'>
    readonly updatedAt: FieldRef<"Vaccine", 'DateTime'>
    readonly expiryDate: FieldRef<"Vaccine", 'DateTime'>
    readonly id: FieldRef<"Vaccine", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Vaccine findUnique
   */
  export type VaccineFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vaccine
     */
    select?: VaccineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vaccine
     */
    omit?: VaccineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VaccineInclude<ExtArgs> | null
    /**
     * Filter, which Vaccine to fetch.
     */
    where: VaccineWhereUniqueInput
  }

  /**
   * Vaccine findUniqueOrThrow
   */
  export type VaccineFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vaccine
     */
    select?: VaccineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vaccine
     */
    omit?: VaccineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VaccineInclude<ExtArgs> | null
    /**
     * Filter, which Vaccine to fetch.
     */
    where: VaccineWhereUniqueInput
  }

  /**
   * Vaccine findFirst
   */
  export type VaccineFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vaccine
     */
    select?: VaccineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vaccine
     */
    omit?: VaccineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VaccineInclude<ExtArgs> | null
    /**
     * Filter, which Vaccine to fetch.
     */
    where?: VaccineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vaccines to fetch.
     */
    orderBy?: VaccineOrderByWithRelationInput | VaccineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Vaccines.
     */
    cursor?: VaccineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vaccines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vaccines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Vaccines.
     */
    distinct?: VaccineScalarFieldEnum | VaccineScalarFieldEnum[]
  }

  /**
   * Vaccine findFirstOrThrow
   */
  export type VaccineFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vaccine
     */
    select?: VaccineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vaccine
     */
    omit?: VaccineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VaccineInclude<ExtArgs> | null
    /**
     * Filter, which Vaccine to fetch.
     */
    where?: VaccineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vaccines to fetch.
     */
    orderBy?: VaccineOrderByWithRelationInput | VaccineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Vaccines.
     */
    cursor?: VaccineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vaccines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vaccines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Vaccines.
     */
    distinct?: VaccineScalarFieldEnum | VaccineScalarFieldEnum[]
  }

  /**
   * Vaccine findMany
   */
  export type VaccineFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vaccine
     */
    select?: VaccineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vaccine
     */
    omit?: VaccineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VaccineInclude<ExtArgs> | null
    /**
     * Filter, which Vaccines to fetch.
     */
    where?: VaccineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vaccines to fetch.
     */
    orderBy?: VaccineOrderByWithRelationInput | VaccineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Vaccines.
     */
    cursor?: VaccineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vaccines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vaccines.
     */
    skip?: number
    distinct?: VaccineScalarFieldEnum | VaccineScalarFieldEnum[]
  }

  /**
   * Vaccine create
   */
  export type VaccineCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vaccine
     */
    select?: VaccineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vaccine
     */
    omit?: VaccineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VaccineInclude<ExtArgs> | null
    /**
     * The data needed to create a Vaccine.
     */
    data: XOR<VaccineCreateInput, VaccineUncheckedCreateInput>
  }

  /**
   * Vaccine createMany
   */
  export type VaccineCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Vaccines.
     */
    data: VaccineCreateManyInput | VaccineCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Vaccine createManyAndReturn
   */
  export type VaccineCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vaccine
     */
    select?: VaccineSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Vaccine
     */
    omit?: VaccineOmit<ExtArgs> | null
    /**
     * The data used to create many Vaccines.
     */
    data: VaccineCreateManyInput | VaccineCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VaccineIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Vaccine update
   */
  export type VaccineUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vaccine
     */
    select?: VaccineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vaccine
     */
    omit?: VaccineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VaccineInclude<ExtArgs> | null
    /**
     * The data needed to update a Vaccine.
     */
    data: XOR<VaccineUpdateInput, VaccineUncheckedUpdateInput>
    /**
     * Choose, which Vaccine to update.
     */
    where: VaccineWhereUniqueInput
  }

  /**
   * Vaccine updateMany
   */
  export type VaccineUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Vaccines.
     */
    data: XOR<VaccineUpdateManyMutationInput, VaccineUncheckedUpdateManyInput>
    /**
     * Filter which Vaccines to update
     */
    where?: VaccineWhereInput
    /**
     * Limit how many Vaccines to update.
     */
    limit?: number
  }

  /**
   * Vaccine updateManyAndReturn
   */
  export type VaccineUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vaccine
     */
    select?: VaccineSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Vaccine
     */
    omit?: VaccineOmit<ExtArgs> | null
    /**
     * The data used to update Vaccines.
     */
    data: XOR<VaccineUpdateManyMutationInput, VaccineUncheckedUpdateManyInput>
    /**
     * Filter which Vaccines to update
     */
    where?: VaccineWhereInput
    /**
     * Limit how many Vaccines to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VaccineIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Vaccine upsert
   */
  export type VaccineUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vaccine
     */
    select?: VaccineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vaccine
     */
    omit?: VaccineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VaccineInclude<ExtArgs> | null
    /**
     * The filter to search for the Vaccine to update in case it exists.
     */
    where: VaccineWhereUniqueInput
    /**
     * In case the Vaccine found by the `where` argument doesn't exist, create a new Vaccine with this data.
     */
    create: XOR<VaccineCreateInput, VaccineUncheckedCreateInput>
    /**
     * In case the Vaccine was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VaccineUpdateInput, VaccineUncheckedUpdateInput>
  }

  /**
   * Vaccine delete
   */
  export type VaccineDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vaccine
     */
    select?: VaccineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vaccine
     */
    omit?: VaccineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VaccineInclude<ExtArgs> | null
    /**
     * Filter which Vaccine to delete.
     */
    where: VaccineWhereUniqueInput
  }

  /**
   * Vaccine deleteMany
   */
  export type VaccineDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Vaccines to delete
     */
    where?: VaccineWhereInput
    /**
     * Limit how many Vaccines to delete.
     */
    limit?: number
  }

  /**
   * Vaccine without action
   */
  export type VaccineDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vaccine
     */
    select?: VaccineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vaccine
     */
    omit?: VaccineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VaccineInclude<ExtArgs> | null
  }


  /**
   * Model Deworming
   */

  export type AggregateDeworming = {
    _count: DewormingCountAggregateOutputType | null
    _min: DewormingMinAggregateOutputType | null
    _max: DewormingMaxAggregateOutputType | null
  }

  export type DewormingMinAggregateOutputType = {
    id: string | null
    name: string | null
    date: Date | null
    animalId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DewormingMaxAggregateOutputType = {
    id: string | null
    name: string | null
    date: Date | null
    animalId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DewormingCountAggregateOutputType = {
    id: number
    name: number
    date: number
    animalId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DewormingMinAggregateInputType = {
    id?: true
    name?: true
    date?: true
    animalId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DewormingMaxAggregateInputType = {
    id?: true
    name?: true
    date?: true
    animalId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DewormingCountAggregateInputType = {
    id?: true
    name?: true
    date?: true
    animalId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DewormingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Deworming to aggregate.
     */
    where?: DewormingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Dewormings to fetch.
     */
    orderBy?: DewormingOrderByWithRelationInput | DewormingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DewormingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Dewormings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Dewormings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Dewormings
    **/
    _count?: true | DewormingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DewormingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DewormingMaxAggregateInputType
  }

  export type GetDewormingAggregateType<T extends DewormingAggregateArgs> = {
        [P in keyof T & keyof AggregateDeworming]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDeworming[P]>
      : GetScalarType<T[P], AggregateDeworming[P]>
  }




  export type DewormingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DewormingWhereInput
    orderBy?: DewormingOrderByWithAggregationInput | DewormingOrderByWithAggregationInput[]
    by: DewormingScalarFieldEnum[] | DewormingScalarFieldEnum
    having?: DewormingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DewormingCountAggregateInputType | true
    _min?: DewormingMinAggregateInputType
    _max?: DewormingMaxAggregateInputType
  }

  export type DewormingGroupByOutputType = {
    id: string
    name: string
    date: Date
    animalId: string
    createdAt: Date
    updatedAt: Date
    _count: DewormingCountAggregateOutputType | null
    _min: DewormingMinAggregateOutputType | null
    _max: DewormingMaxAggregateOutputType | null
  }

  type GetDewormingGroupByPayload<T extends DewormingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DewormingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DewormingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DewormingGroupByOutputType[P]>
            : GetScalarType<T[P], DewormingGroupByOutputType[P]>
        }
      >
    >


  export type DewormingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    date?: boolean
    animalId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    animal?: boolean | AnimalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["deworming"]>

  export type DewormingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    date?: boolean
    animalId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    animal?: boolean | AnimalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["deworming"]>

  export type DewormingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    date?: boolean
    animalId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    animal?: boolean | AnimalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["deworming"]>

  export type DewormingSelectScalar = {
    id?: boolean
    name?: boolean
    date?: boolean
    animalId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DewormingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "date" | "animalId" | "createdAt" | "updatedAt", ExtArgs["result"]["deworming"]>
  export type DewormingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    animal?: boolean | AnimalDefaultArgs<ExtArgs>
  }
  export type DewormingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    animal?: boolean | AnimalDefaultArgs<ExtArgs>
  }
  export type DewormingIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    animal?: boolean | AnimalDefaultArgs<ExtArgs>
  }

  export type $DewormingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Deworming"
    objects: {
      animal: Prisma.$AnimalPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      date: Date
      animalId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["deworming"]>
    composites: {}
  }

  type DewormingGetPayload<S extends boolean | null | undefined | DewormingDefaultArgs> = $Result.GetResult<Prisma.$DewormingPayload, S>

  type DewormingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DewormingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DewormingCountAggregateInputType | true
    }

  export interface DewormingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Deworming'], meta: { name: 'Deworming' } }
    /**
     * Find zero or one Deworming that matches the filter.
     * @param {DewormingFindUniqueArgs} args - Arguments to find a Deworming
     * @example
     * // Get one Deworming
     * const deworming = await prisma.deworming.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DewormingFindUniqueArgs>(args: SelectSubset<T, DewormingFindUniqueArgs<ExtArgs>>): Prisma__DewormingClient<$Result.GetResult<Prisma.$DewormingPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one Deworming that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DewormingFindUniqueOrThrowArgs} args - Arguments to find a Deworming
     * @example
     * // Get one Deworming
     * const deworming = await prisma.deworming.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DewormingFindUniqueOrThrowArgs>(args: SelectSubset<T, DewormingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DewormingClient<$Result.GetResult<Prisma.$DewormingPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first Deworming that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DewormingFindFirstArgs} args - Arguments to find a Deworming
     * @example
     * // Get one Deworming
     * const deworming = await prisma.deworming.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DewormingFindFirstArgs>(args?: SelectSubset<T, DewormingFindFirstArgs<ExtArgs>>): Prisma__DewormingClient<$Result.GetResult<Prisma.$DewormingPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first Deworming that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DewormingFindFirstOrThrowArgs} args - Arguments to find a Deworming
     * @example
     * // Get one Deworming
     * const deworming = await prisma.deworming.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DewormingFindFirstOrThrowArgs>(args?: SelectSubset<T, DewormingFindFirstOrThrowArgs<ExtArgs>>): Prisma__DewormingClient<$Result.GetResult<Prisma.$DewormingPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Dewormings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DewormingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Dewormings
     * const dewormings = await prisma.deworming.findMany()
     * 
     * // Get first 10 Dewormings
     * const dewormings = await prisma.deworming.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const dewormingWithIdOnly = await prisma.deworming.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DewormingFindManyArgs>(args?: SelectSubset<T, DewormingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DewormingPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a Deworming.
     * @param {DewormingCreateArgs} args - Arguments to create a Deworming.
     * @example
     * // Create one Deworming
     * const Deworming = await prisma.deworming.create({
     *   data: {
     *     // ... data to create a Deworming
     *   }
     * })
     * 
     */
    create<T extends DewormingCreateArgs>(args: SelectSubset<T, DewormingCreateArgs<ExtArgs>>): Prisma__DewormingClient<$Result.GetResult<Prisma.$DewormingPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Dewormings.
     * @param {DewormingCreateManyArgs} args - Arguments to create many Dewormings.
     * @example
     * // Create many Dewormings
     * const deworming = await prisma.deworming.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DewormingCreateManyArgs>(args?: SelectSubset<T, DewormingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Dewormings and returns the data saved in the database.
     * @param {DewormingCreateManyAndReturnArgs} args - Arguments to create many Dewormings.
     * @example
     * // Create many Dewormings
     * const deworming = await prisma.deworming.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Dewormings and only return the `id`
     * const dewormingWithIdOnly = await prisma.deworming.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DewormingCreateManyAndReturnArgs>(args?: SelectSubset<T, DewormingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DewormingPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a Deworming.
     * @param {DewormingDeleteArgs} args - Arguments to delete one Deworming.
     * @example
     * // Delete one Deworming
     * const Deworming = await prisma.deworming.delete({
     *   where: {
     *     // ... filter to delete one Deworming
     *   }
     * })
     * 
     */
    delete<T extends DewormingDeleteArgs>(args: SelectSubset<T, DewormingDeleteArgs<ExtArgs>>): Prisma__DewormingClient<$Result.GetResult<Prisma.$DewormingPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one Deworming.
     * @param {DewormingUpdateArgs} args - Arguments to update one Deworming.
     * @example
     * // Update one Deworming
     * const deworming = await prisma.deworming.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DewormingUpdateArgs>(args: SelectSubset<T, DewormingUpdateArgs<ExtArgs>>): Prisma__DewormingClient<$Result.GetResult<Prisma.$DewormingPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Dewormings.
     * @param {DewormingDeleteManyArgs} args - Arguments to filter Dewormings to delete.
     * @example
     * // Delete a few Dewormings
     * const { count } = await prisma.deworming.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DewormingDeleteManyArgs>(args?: SelectSubset<T, DewormingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Dewormings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DewormingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Dewormings
     * const deworming = await prisma.deworming.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DewormingUpdateManyArgs>(args: SelectSubset<T, DewormingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Dewormings and returns the data updated in the database.
     * @param {DewormingUpdateManyAndReturnArgs} args - Arguments to update many Dewormings.
     * @example
     * // Update many Dewormings
     * const deworming = await prisma.deworming.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Dewormings and only return the `id`
     * const dewormingWithIdOnly = await prisma.deworming.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DewormingUpdateManyAndReturnArgs>(args: SelectSubset<T, DewormingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DewormingPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one Deworming.
     * @param {DewormingUpsertArgs} args - Arguments to update or create a Deworming.
     * @example
     * // Update or create a Deworming
     * const deworming = await prisma.deworming.upsert({
     *   create: {
     *     // ... data to create a Deworming
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Deworming we want to update
     *   }
     * })
     */
    upsert<T extends DewormingUpsertArgs>(args: SelectSubset<T, DewormingUpsertArgs<ExtArgs>>): Prisma__DewormingClient<$Result.GetResult<Prisma.$DewormingPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Dewormings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DewormingCountArgs} args - Arguments to filter Dewormings to count.
     * @example
     * // Count the number of Dewormings
     * const count = await prisma.deworming.count({
     *   where: {
     *     // ... the filter for the Dewormings we want to count
     *   }
     * })
    **/
    count<T extends DewormingCountArgs>(
      args?: Subset<T, DewormingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DewormingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Deworming.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DewormingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DewormingAggregateArgs>(args: Subset<T, DewormingAggregateArgs>): Prisma.PrismaPromise<GetDewormingAggregateType<T>>

    /**
     * Group by Deworming.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DewormingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DewormingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DewormingGroupByArgs['orderBy'] }
        : { orderBy?: DewormingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DewormingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDewormingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Deworming model
   */
  readonly fields: DewormingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Deworming.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DewormingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    animal<T extends AnimalDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AnimalDefaultArgs<ExtArgs>>): Prisma__AnimalClient<$Result.GetResult<Prisma.$AnimalPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Deworming model
   */ 
  interface DewormingFieldRefs {
    readonly id: FieldRef<"Deworming", 'String'>
    readonly name: FieldRef<"Deworming", 'String'>
    readonly date: FieldRef<"Deworming", 'DateTime'>
    readonly animalId: FieldRef<"Deworming", 'String'>
    readonly createdAt: FieldRef<"Deworming", 'DateTime'>
    readonly updatedAt: FieldRef<"Deworming", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Deworming findUnique
   */
  export type DewormingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deworming
     */
    select?: DewormingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deworming
     */
    omit?: DewormingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DewormingInclude<ExtArgs> | null
    /**
     * Filter, which Deworming to fetch.
     */
    where: DewormingWhereUniqueInput
  }

  /**
   * Deworming findUniqueOrThrow
   */
  export type DewormingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deworming
     */
    select?: DewormingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deworming
     */
    omit?: DewormingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DewormingInclude<ExtArgs> | null
    /**
     * Filter, which Deworming to fetch.
     */
    where: DewormingWhereUniqueInput
  }

  /**
   * Deworming findFirst
   */
  export type DewormingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deworming
     */
    select?: DewormingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deworming
     */
    omit?: DewormingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DewormingInclude<ExtArgs> | null
    /**
     * Filter, which Deworming to fetch.
     */
    where?: DewormingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Dewormings to fetch.
     */
    orderBy?: DewormingOrderByWithRelationInput | DewormingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Dewormings.
     */
    cursor?: DewormingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Dewormings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Dewormings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Dewormings.
     */
    distinct?: DewormingScalarFieldEnum | DewormingScalarFieldEnum[]
  }

  /**
   * Deworming findFirstOrThrow
   */
  export type DewormingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deworming
     */
    select?: DewormingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deworming
     */
    omit?: DewormingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DewormingInclude<ExtArgs> | null
    /**
     * Filter, which Deworming to fetch.
     */
    where?: DewormingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Dewormings to fetch.
     */
    orderBy?: DewormingOrderByWithRelationInput | DewormingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Dewormings.
     */
    cursor?: DewormingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Dewormings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Dewormings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Dewormings.
     */
    distinct?: DewormingScalarFieldEnum | DewormingScalarFieldEnum[]
  }

  /**
   * Deworming findMany
   */
  export type DewormingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deworming
     */
    select?: DewormingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deworming
     */
    omit?: DewormingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DewormingInclude<ExtArgs> | null
    /**
     * Filter, which Dewormings to fetch.
     */
    where?: DewormingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Dewormings to fetch.
     */
    orderBy?: DewormingOrderByWithRelationInput | DewormingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Dewormings.
     */
    cursor?: DewormingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Dewormings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Dewormings.
     */
    skip?: number
    distinct?: DewormingScalarFieldEnum | DewormingScalarFieldEnum[]
  }

  /**
   * Deworming create
   */
  export type DewormingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deworming
     */
    select?: DewormingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deworming
     */
    omit?: DewormingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DewormingInclude<ExtArgs> | null
    /**
     * The data needed to create a Deworming.
     */
    data: XOR<DewormingCreateInput, DewormingUncheckedCreateInput>
  }

  /**
   * Deworming createMany
   */
  export type DewormingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Dewormings.
     */
    data: DewormingCreateManyInput | DewormingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Deworming createManyAndReturn
   */
  export type DewormingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deworming
     */
    select?: DewormingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Deworming
     */
    omit?: DewormingOmit<ExtArgs> | null
    /**
     * The data used to create many Dewormings.
     */
    data: DewormingCreateManyInput | DewormingCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DewormingIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Deworming update
   */
  export type DewormingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deworming
     */
    select?: DewormingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deworming
     */
    omit?: DewormingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DewormingInclude<ExtArgs> | null
    /**
     * The data needed to update a Deworming.
     */
    data: XOR<DewormingUpdateInput, DewormingUncheckedUpdateInput>
    /**
     * Choose, which Deworming to update.
     */
    where: DewormingWhereUniqueInput
  }

  /**
   * Deworming updateMany
   */
  export type DewormingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Dewormings.
     */
    data: XOR<DewormingUpdateManyMutationInput, DewormingUncheckedUpdateManyInput>
    /**
     * Filter which Dewormings to update
     */
    where?: DewormingWhereInput
    /**
     * Limit how many Dewormings to update.
     */
    limit?: number
  }

  /**
   * Deworming updateManyAndReturn
   */
  export type DewormingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deworming
     */
    select?: DewormingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Deworming
     */
    omit?: DewormingOmit<ExtArgs> | null
    /**
     * The data used to update Dewormings.
     */
    data: XOR<DewormingUpdateManyMutationInput, DewormingUncheckedUpdateManyInput>
    /**
     * Filter which Dewormings to update
     */
    where?: DewormingWhereInput
    /**
     * Limit how many Dewormings to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DewormingIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Deworming upsert
   */
  export type DewormingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deworming
     */
    select?: DewormingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deworming
     */
    omit?: DewormingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DewormingInclude<ExtArgs> | null
    /**
     * The filter to search for the Deworming to update in case it exists.
     */
    where: DewormingWhereUniqueInput
    /**
     * In case the Deworming found by the `where` argument doesn't exist, create a new Deworming with this data.
     */
    create: XOR<DewormingCreateInput, DewormingUncheckedCreateInput>
    /**
     * In case the Deworming was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DewormingUpdateInput, DewormingUncheckedUpdateInput>
  }

  /**
   * Deworming delete
   */
  export type DewormingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deworming
     */
    select?: DewormingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deworming
     */
    omit?: DewormingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DewormingInclude<ExtArgs> | null
    /**
     * Filter which Deworming to delete.
     */
    where: DewormingWhereUniqueInput
  }

  /**
   * Deworming deleteMany
   */
  export type DewormingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Dewormings to delete
     */
    where?: DewormingWhereInput
    /**
     * Limit how many Dewormings to delete.
     */
    limit?: number
  }

  /**
   * Deworming without action
   */
  export type DewormingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deworming
     */
    select?: DewormingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deworming
     */
    omit?: DewormingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DewormingInclude<ExtArgs> | null
  }


  /**
   * Model Account
   */

  export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  export type AccountAvgAggregateOutputType = {
    expires_at: number | null
  }

  export type AccountSumAggregateOutputType = {
    expires_at: number | null
  }

  export type AccountMinAggregateOutputType = {
    userId: string | null
    type: string | null
    provider: string | null
    providerAccountId: string | null
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccountMaxAggregateOutputType = {
    userId: string | null
    type: string | null
    provider: string | null
    providerAccountId: string | null
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccountCountAggregateOutputType = {
    userId: number
    type: number
    provider: number
    providerAccountId: number
    refresh_token: number
    access_token: number
    expires_at: number
    token_type: number
    scope: number
    id_token: number
    session_state: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AccountAvgAggregateInputType = {
    expires_at?: true
  }

  export type AccountSumAggregateInputType = {
    expires_at?: true
  }

  export type AccountMinAggregateInputType = {
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccountMaxAggregateInputType = {
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccountCountAggregateInputType = {
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Account to aggregate.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Accounts
    **/
    _count?: true | AccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AccountAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AccountSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountMaxAggregateInputType
  }

  export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
        [P in keyof T & keyof AggregateAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccount[P]>
      : GetScalarType<T[P], AggregateAccount[P]>
  }




  export type AccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithAggregationInput | AccountOrderByWithAggregationInput[]
    by: AccountScalarFieldEnum[] | AccountScalarFieldEnum
    having?: AccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountCountAggregateInputType | true
    _avg?: AccountAvgAggregateInputType
    _sum?: AccountSumAggregateInputType
    _min?: AccountMinAggregateInputType
    _max?: AccountMaxAggregateInputType
  }

  export type AccountGroupByOutputType = {
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
    createdAt: Date
    updatedAt: Date
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  type GetAccountGroupByPayload<T extends AccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountGroupByOutputType[P]>
            : GetScalarType<T[P], AccountGroupByOutputType[P]>
        }
      >
    >


  export type AccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectScalar = {
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AccountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"userId" | "type" | "provider" | "providerAccountId" | "refresh_token" | "access_token" | "expires_at" | "token_type" | "scope" | "id_token" | "session_state" | "createdAt" | "updatedAt", ExtArgs["result"]["account"]>
  export type AccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Account"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      userId: string
      type: string
      provider: string
      providerAccountId: string
      refresh_token: string | null
      access_token: string | null
      expires_at: number | null
      token_type: string | null
      scope: string | null
      id_token: string | null
      session_state: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["account"]>
    composites: {}
  }

  type AccountGetPayload<S extends boolean | null | undefined | AccountDefaultArgs> = $Result.GetResult<Prisma.$AccountPayload, S>

  type AccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AccountCountAggregateInputType | true
    }

  export interface AccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Account'], meta: { name: 'Account' } }
    /**
     * Find zero or one Account that matches the filter.
     * @param {AccountFindUniqueArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccountFindUniqueArgs>(args: SelectSubset<T, AccountFindUniqueArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one Account that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AccountFindUniqueOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs>(args: SelectSubset<T, AccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first Account that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccountFindFirstArgs>(args?: SelectSubset<T, AccountFindFirstArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first Account that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs>(args?: SelectSubset<T, AccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.account.findMany()
     * 
     * // Get first 10 Accounts
     * const accounts = await prisma.account.findMany({ take: 10 })
     * 
     * // Only select the `userId`
     * const accountWithUserIdOnly = await prisma.account.findMany({ select: { userId: true } })
     * 
     */
    findMany<T extends AccountFindManyArgs>(args?: SelectSubset<T, AccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a Account.
     * @param {AccountCreateArgs} args - Arguments to create a Account.
     * @example
     * // Create one Account
     * const Account = await prisma.account.create({
     *   data: {
     *     // ... data to create a Account
     *   }
     * })
     * 
     */
    create<T extends AccountCreateArgs>(args: SelectSubset<T, AccountCreateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Accounts.
     * @param {AccountCreateManyArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AccountCreateManyArgs>(args?: SelectSubset<T, AccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Accounts and returns the data saved in the database.
     * @param {AccountCreateManyAndReturnArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Accounts and only return the `userId`
     * const accountWithUserIdOnly = await prisma.account.createManyAndReturn({
     *   select: { userId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AccountCreateManyAndReturnArgs>(args?: SelectSubset<T, AccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a Account.
     * @param {AccountDeleteArgs} args - Arguments to delete one Account.
     * @example
     * // Delete one Account
     * const Account = await prisma.account.delete({
     *   where: {
     *     // ... filter to delete one Account
     *   }
     * })
     * 
     */
    delete<T extends AccountDeleteArgs>(args: SelectSubset<T, AccountDeleteArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one Account.
     * @param {AccountUpdateArgs} args - Arguments to update one Account.
     * @example
     * // Update one Account
     * const account = await prisma.account.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AccountUpdateArgs>(args: SelectSubset<T, AccountUpdateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Accounts.
     * @param {AccountDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.account.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AccountDeleteManyArgs>(args?: SelectSubset<T, AccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AccountUpdateManyArgs>(args: SelectSubset<T, AccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts and returns the data updated in the database.
     * @param {AccountUpdateManyAndReturnArgs} args - Arguments to update many Accounts.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Accounts and only return the `userId`
     * const accountWithUserIdOnly = await prisma.account.updateManyAndReturn({
     *   select: { userId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AccountUpdateManyAndReturnArgs>(args: SelectSubset<T, AccountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one Account.
     * @param {AccountUpsertArgs} args - Arguments to update or create a Account.
     * @example
     * // Update or create a Account
     * const account = await prisma.account.upsert({
     *   create: {
     *     // ... data to create a Account
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Account we want to update
     *   }
     * })
     */
    upsert<T extends AccountUpsertArgs>(args: SelectSubset<T, AccountUpsertArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.account.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
    **/
    count<T extends AccountCountArgs>(
      args?: Subset<T, AccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AccountAggregateArgs>(args: Subset<T, AccountAggregateArgs>): Prisma.PrismaPromise<GetAccountAggregateType<T>>

    /**
     * Group by Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountGroupByArgs['orderBy'] }
        : { orderBy?: AccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Account model
   */
  readonly fields: AccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Account model
   */ 
  interface AccountFieldRefs {
    readonly userId: FieldRef<"Account", 'String'>
    readonly type: FieldRef<"Account", 'String'>
    readonly provider: FieldRef<"Account", 'String'>
    readonly providerAccountId: FieldRef<"Account", 'String'>
    readonly refresh_token: FieldRef<"Account", 'String'>
    readonly access_token: FieldRef<"Account", 'String'>
    readonly expires_at: FieldRef<"Account", 'Int'>
    readonly token_type: FieldRef<"Account", 'String'>
    readonly scope: FieldRef<"Account", 'String'>
    readonly id_token: FieldRef<"Account", 'String'>
    readonly session_state: FieldRef<"Account", 'String'>
    readonly createdAt: FieldRef<"Account", 'DateTime'>
    readonly updatedAt: FieldRef<"Account", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Account findUnique
   */
  export type AccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findUniqueOrThrow
   */
  export type AccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findFirst
   */
  export type AccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findFirstOrThrow
   */
  export type AccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findMany
   */
  export type AccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Accounts to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account create
   */
  export type AccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to create a Account.
     */
    data: XOR<AccountCreateInput, AccountUncheckedCreateInput>
  }

  /**
   * Account createMany
   */
  export type AccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Account createManyAndReturn
   */
  export type AccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account update
   */
  export type AccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to update a Account.
     */
    data: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
    /**
     * Choose, which Account to update.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account updateMany
   */
  export type AccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
  }

  /**
   * Account updateManyAndReturn
   */
  export type AccountUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account upsert
   */
  export type AccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The filter to search for the Account to update in case it exists.
     */
    where: AccountWhereUniqueInput
    /**
     * In case the Account found by the `where` argument doesn't exist, create a new Account with this data.
     */
    create: XOR<AccountCreateInput, AccountUncheckedCreateInput>
    /**
     * In case the Account was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
  }

  /**
   * Account delete
   */
  export type AccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter which Account to delete.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account deleteMany
   */
  export type AccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Accounts to delete
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to delete.
     */
    limit?: number
  }

  /**
   * Account without action
   */
  export type AccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    sessionToken: string | null
    userId: string | null
    expires: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SessionMaxAggregateOutputType = {
    sessionToken: string | null
    userId: string | null
    expires: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SessionCountAggregateOutputType = {
    sessionToken: number
    userId: number
    expires: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    sessionToken?: true
    userId?: true
    expires?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SessionMaxAggregateInputType = {
    sessionToken?: true
    userId?: true
    expires?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SessionCountAggregateInputType = {
    sessionToken?: true
    userId?: true
    expires?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    sessionToken: string
    userId: string
    expires: Date
    createdAt: Date
    updatedAt: Date
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"sessionToken" | "userId" | "expires" | "createdAt" | "updatedAt", ExtArgs["result"]["session"]>
  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      sessionToken: string
      userId: string
      expires: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `sessionToken`
     * const sessionWithSessionTokenOnly = await prisma.session.findMany({ select: { sessionToken: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `sessionToken`
     * const sessionWithSessionTokenOnly = await prisma.session.createManyAndReturn({
     *   select: { sessionToken: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions and returns the data updated in the database.
     * @param {SessionUpdateManyAndReturnArgs} args - Arguments to update many Sessions.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sessions and only return the `sessionToken`
     * const sessionWithSessionTokenOnly = await prisma.session.updateManyAndReturn({
     *   select: { sessionToken: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SessionUpdateManyAndReturnArgs>(args: SelectSubset<T, SessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Session model
   */ 
  interface SessionFieldRefs {
    readonly sessionToken: FieldRef<"Session", 'String'>
    readonly userId: FieldRef<"Session", 'String'>
    readonly expires: FieldRef<"Session", 'DateTime'>
    readonly createdAt: FieldRef<"Session", 'DateTime'>
    readonly updatedAt: FieldRef<"Session", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session updateManyAndReturn
   */
  export type SessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model VerificationToken
   */

  export type AggregateVerificationToken = {
    _count: VerificationTokenCountAggregateOutputType | null
    _min: VerificationTokenMinAggregateOutputType | null
    _max: VerificationTokenMaxAggregateOutputType | null
  }

  export type VerificationTokenMinAggregateOutputType = {
    identifier: string | null
    token: string | null
    expires: Date | null
  }

  export type VerificationTokenMaxAggregateOutputType = {
    identifier: string | null
    token: string | null
    expires: Date | null
  }

  export type VerificationTokenCountAggregateOutputType = {
    identifier: number
    token: number
    expires: number
    _all: number
  }


  export type VerificationTokenMinAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
  }

  export type VerificationTokenMaxAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
  }

  export type VerificationTokenCountAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
    _all?: true
  }

  export type VerificationTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VerificationToken to aggregate.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VerificationTokens
    **/
    _count?: true | VerificationTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VerificationTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VerificationTokenMaxAggregateInputType
  }

  export type GetVerificationTokenAggregateType<T extends VerificationTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateVerificationToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVerificationToken[P]>
      : GetScalarType<T[P], AggregateVerificationToken[P]>
  }




  export type VerificationTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VerificationTokenWhereInput
    orderBy?: VerificationTokenOrderByWithAggregationInput | VerificationTokenOrderByWithAggregationInput[]
    by: VerificationTokenScalarFieldEnum[] | VerificationTokenScalarFieldEnum
    having?: VerificationTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VerificationTokenCountAggregateInputType | true
    _min?: VerificationTokenMinAggregateInputType
    _max?: VerificationTokenMaxAggregateInputType
  }

  export type VerificationTokenGroupByOutputType = {
    identifier: string
    token: string
    expires: Date
    _count: VerificationTokenCountAggregateOutputType | null
    _min: VerificationTokenMinAggregateOutputType | null
    _max: VerificationTokenMaxAggregateOutputType | null
  }

  type GetVerificationTokenGroupByPayload<T extends VerificationTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VerificationTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VerificationTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>
            : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>
        }
      >
    >


  export type VerificationTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectScalar = {
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }

  export type VerificationTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"identifier" | "token" | "expires", ExtArgs["result"]["verificationToken"]>

  export type $VerificationTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VerificationToken"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      identifier: string
      token: string
      expires: Date
    }, ExtArgs["result"]["verificationToken"]>
    composites: {}
  }

  type VerificationTokenGetPayload<S extends boolean | null | undefined | VerificationTokenDefaultArgs> = $Result.GetResult<Prisma.$VerificationTokenPayload, S>

  type VerificationTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VerificationTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VerificationTokenCountAggregateInputType | true
    }

  export interface VerificationTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VerificationToken'], meta: { name: 'VerificationToken' } }
    /**
     * Find zero or one VerificationToken that matches the filter.
     * @param {VerificationTokenFindUniqueArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VerificationTokenFindUniqueArgs>(args: SelectSubset<T, VerificationTokenFindUniqueArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one VerificationToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VerificationTokenFindUniqueOrThrowArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VerificationTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, VerificationTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first VerificationToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindFirstArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VerificationTokenFindFirstArgs>(args?: SelectSubset<T, VerificationTokenFindFirstArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first VerificationToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindFirstOrThrowArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VerificationTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, VerificationTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more VerificationTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VerificationTokens
     * const verificationTokens = await prisma.verificationToken.findMany()
     * 
     * // Get first 10 VerificationTokens
     * const verificationTokens = await prisma.verificationToken.findMany({ take: 10 })
     * 
     * // Only select the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.findMany({ select: { identifier: true } })
     * 
     */
    findMany<T extends VerificationTokenFindManyArgs>(args?: SelectSubset<T, VerificationTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a VerificationToken.
     * @param {VerificationTokenCreateArgs} args - Arguments to create a VerificationToken.
     * @example
     * // Create one VerificationToken
     * const VerificationToken = await prisma.verificationToken.create({
     *   data: {
     *     // ... data to create a VerificationToken
     *   }
     * })
     * 
     */
    create<T extends VerificationTokenCreateArgs>(args: SelectSubset<T, VerificationTokenCreateArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many VerificationTokens.
     * @param {VerificationTokenCreateManyArgs} args - Arguments to create many VerificationTokens.
     * @example
     * // Create many VerificationTokens
     * const verificationToken = await prisma.verificationToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VerificationTokenCreateManyArgs>(args?: SelectSubset<T, VerificationTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VerificationTokens and returns the data saved in the database.
     * @param {VerificationTokenCreateManyAndReturnArgs} args - Arguments to create many VerificationTokens.
     * @example
     * // Create many VerificationTokens
     * const verificationToken = await prisma.verificationToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VerificationTokens and only return the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.createManyAndReturn({
     *   select: { identifier: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VerificationTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, VerificationTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a VerificationToken.
     * @param {VerificationTokenDeleteArgs} args - Arguments to delete one VerificationToken.
     * @example
     * // Delete one VerificationToken
     * const VerificationToken = await prisma.verificationToken.delete({
     *   where: {
     *     // ... filter to delete one VerificationToken
     *   }
     * })
     * 
     */
    delete<T extends VerificationTokenDeleteArgs>(args: SelectSubset<T, VerificationTokenDeleteArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one VerificationToken.
     * @param {VerificationTokenUpdateArgs} args - Arguments to update one VerificationToken.
     * @example
     * // Update one VerificationToken
     * const verificationToken = await prisma.verificationToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VerificationTokenUpdateArgs>(args: SelectSubset<T, VerificationTokenUpdateArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more VerificationTokens.
     * @param {VerificationTokenDeleteManyArgs} args - Arguments to filter VerificationTokens to delete.
     * @example
     * // Delete a few VerificationTokens
     * const { count } = await prisma.verificationToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VerificationTokenDeleteManyArgs>(args?: SelectSubset<T, VerificationTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VerificationTokens
     * const verificationToken = await prisma.verificationToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VerificationTokenUpdateManyArgs>(args: SelectSubset<T, VerificationTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VerificationTokens and returns the data updated in the database.
     * @param {VerificationTokenUpdateManyAndReturnArgs} args - Arguments to update many VerificationTokens.
     * @example
     * // Update many VerificationTokens
     * const verificationToken = await prisma.verificationToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more VerificationTokens and only return the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.updateManyAndReturn({
     *   select: { identifier: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VerificationTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, VerificationTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one VerificationToken.
     * @param {VerificationTokenUpsertArgs} args - Arguments to update or create a VerificationToken.
     * @example
     * // Update or create a VerificationToken
     * const verificationToken = await prisma.verificationToken.upsert({
     *   create: {
     *     // ... data to create a VerificationToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VerificationToken we want to update
     *   }
     * })
     */
    upsert<T extends VerificationTokenUpsertArgs>(args: SelectSubset<T, VerificationTokenUpsertArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of VerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenCountArgs} args - Arguments to filter VerificationTokens to count.
     * @example
     * // Count the number of VerificationTokens
     * const count = await prisma.verificationToken.count({
     *   where: {
     *     // ... the filter for the VerificationTokens we want to count
     *   }
     * })
    **/
    count<T extends VerificationTokenCountArgs>(
      args?: Subset<T, VerificationTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VerificationTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VerificationTokenAggregateArgs>(args: Subset<T, VerificationTokenAggregateArgs>): Prisma.PrismaPromise<GetVerificationTokenAggregateType<T>>

    /**
     * Group by VerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VerificationTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VerificationTokenGroupByArgs['orderBy'] }
        : { orderBy?: VerificationTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VerificationTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVerificationTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VerificationToken model
   */
  readonly fields: VerificationTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VerificationToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VerificationTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the VerificationToken model
   */ 
  interface VerificationTokenFieldRefs {
    readonly identifier: FieldRef<"VerificationToken", 'String'>
    readonly token: FieldRef<"VerificationToken", 'String'>
    readonly expires: FieldRef<"VerificationToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * VerificationToken findUnique
   */
  export type VerificationTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken findUniqueOrThrow
   */
  export type VerificationTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken findFirst
   */
  export type VerificationTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken findFirstOrThrow
   */
  export type VerificationTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken findMany
   */
  export type VerificationTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationTokens to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken create
   */
  export type VerificationTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data needed to create a VerificationToken.
     */
    data: XOR<VerificationTokenCreateInput, VerificationTokenUncheckedCreateInput>
  }

  /**
   * VerificationToken createMany
   */
  export type VerificationTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VerificationTokens.
     */
    data: VerificationTokenCreateManyInput | VerificationTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VerificationToken createManyAndReturn
   */
  export type VerificationTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data used to create many VerificationTokens.
     */
    data: VerificationTokenCreateManyInput | VerificationTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VerificationToken update
   */
  export type VerificationTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data needed to update a VerificationToken.
     */
    data: XOR<VerificationTokenUpdateInput, VerificationTokenUncheckedUpdateInput>
    /**
     * Choose, which VerificationToken to update.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken updateMany
   */
  export type VerificationTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VerificationTokens.
     */
    data: XOR<VerificationTokenUpdateManyMutationInput, VerificationTokenUncheckedUpdateManyInput>
    /**
     * Filter which VerificationTokens to update
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to update.
     */
    limit?: number
  }

  /**
   * VerificationToken updateManyAndReturn
   */
  export type VerificationTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data used to update VerificationTokens.
     */
    data: XOR<VerificationTokenUpdateManyMutationInput, VerificationTokenUncheckedUpdateManyInput>
    /**
     * Filter which VerificationTokens to update
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to update.
     */
    limit?: number
  }

  /**
   * VerificationToken upsert
   */
  export type VerificationTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The filter to search for the VerificationToken to update in case it exists.
     */
    where: VerificationTokenWhereUniqueInput
    /**
     * In case the VerificationToken found by the `where` argument doesn't exist, create a new VerificationToken with this data.
     */
    create: XOR<VerificationTokenCreateInput, VerificationTokenUncheckedCreateInput>
    /**
     * In case the VerificationToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VerificationTokenUpdateInput, VerificationTokenUncheckedUpdateInput>
  }

  /**
   * VerificationToken delete
   */
  export type VerificationTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter which VerificationToken to delete.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken deleteMany
   */
  export type VerificationTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VerificationTokens to delete
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to delete.
     */
    limit?: number
  }

  /**
   * VerificationToken without action
   */
  export type VerificationTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
  }


  /**
   * Model Authenticator
   */

  export type AggregateAuthenticator = {
    _count: AuthenticatorCountAggregateOutputType | null
    _avg: AuthenticatorAvgAggregateOutputType | null
    _sum: AuthenticatorSumAggregateOutputType | null
    _min: AuthenticatorMinAggregateOutputType | null
    _max: AuthenticatorMaxAggregateOutputType | null
  }

  export type AuthenticatorAvgAggregateOutputType = {
    counter: number | null
  }

  export type AuthenticatorSumAggregateOutputType = {
    counter: number | null
  }

  export type AuthenticatorMinAggregateOutputType = {
    credentialID: string | null
    userId: string | null
    providerAccountId: string | null
    credentialPublicKey: string | null
    counter: number | null
    credentialDeviceType: string | null
    credentialBackedUp: boolean | null
    transports: string | null
  }

  export type AuthenticatorMaxAggregateOutputType = {
    credentialID: string | null
    userId: string | null
    providerAccountId: string | null
    credentialPublicKey: string | null
    counter: number | null
    credentialDeviceType: string | null
    credentialBackedUp: boolean | null
    transports: string | null
  }

  export type AuthenticatorCountAggregateOutputType = {
    credentialID: number
    userId: number
    providerAccountId: number
    credentialPublicKey: number
    counter: number
    credentialDeviceType: number
    credentialBackedUp: number
    transports: number
    _all: number
  }


  export type AuthenticatorAvgAggregateInputType = {
    counter?: true
  }

  export type AuthenticatorSumAggregateInputType = {
    counter?: true
  }

  export type AuthenticatorMinAggregateInputType = {
    credentialID?: true
    userId?: true
    providerAccountId?: true
    credentialPublicKey?: true
    counter?: true
    credentialDeviceType?: true
    credentialBackedUp?: true
    transports?: true
  }

  export type AuthenticatorMaxAggregateInputType = {
    credentialID?: true
    userId?: true
    providerAccountId?: true
    credentialPublicKey?: true
    counter?: true
    credentialDeviceType?: true
    credentialBackedUp?: true
    transports?: true
  }

  export type AuthenticatorCountAggregateInputType = {
    credentialID?: true
    userId?: true
    providerAccountId?: true
    credentialPublicKey?: true
    counter?: true
    credentialDeviceType?: true
    credentialBackedUp?: true
    transports?: true
    _all?: true
  }

  export type AuthenticatorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Authenticator to aggregate.
     */
    where?: AuthenticatorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Authenticators to fetch.
     */
    orderBy?: AuthenticatorOrderByWithRelationInput | AuthenticatorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuthenticatorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Authenticators from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Authenticators.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Authenticators
    **/
    _count?: true | AuthenticatorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AuthenticatorAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AuthenticatorSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuthenticatorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuthenticatorMaxAggregateInputType
  }

  export type GetAuthenticatorAggregateType<T extends AuthenticatorAggregateArgs> = {
        [P in keyof T & keyof AggregateAuthenticator]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuthenticator[P]>
      : GetScalarType<T[P], AggregateAuthenticator[P]>
  }




  export type AuthenticatorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuthenticatorWhereInput
    orderBy?: AuthenticatorOrderByWithAggregationInput | AuthenticatorOrderByWithAggregationInput[]
    by: AuthenticatorScalarFieldEnum[] | AuthenticatorScalarFieldEnum
    having?: AuthenticatorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuthenticatorCountAggregateInputType | true
    _avg?: AuthenticatorAvgAggregateInputType
    _sum?: AuthenticatorSumAggregateInputType
    _min?: AuthenticatorMinAggregateInputType
    _max?: AuthenticatorMaxAggregateInputType
  }

  export type AuthenticatorGroupByOutputType = {
    credentialID: string
    userId: string
    providerAccountId: string
    credentialPublicKey: string
    counter: number
    credentialDeviceType: string
    credentialBackedUp: boolean
    transports: string | null
    _count: AuthenticatorCountAggregateOutputType | null
    _avg: AuthenticatorAvgAggregateOutputType | null
    _sum: AuthenticatorSumAggregateOutputType | null
    _min: AuthenticatorMinAggregateOutputType | null
    _max: AuthenticatorMaxAggregateOutputType | null
  }

  type GetAuthenticatorGroupByPayload<T extends AuthenticatorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuthenticatorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuthenticatorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuthenticatorGroupByOutputType[P]>
            : GetScalarType<T[P], AuthenticatorGroupByOutputType[P]>
        }
      >
    >


  export type AuthenticatorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    credentialID?: boolean
    userId?: boolean
    providerAccountId?: boolean
    credentialPublicKey?: boolean
    counter?: boolean
    credentialDeviceType?: boolean
    credentialBackedUp?: boolean
    transports?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["authenticator"]>

  export type AuthenticatorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    credentialID?: boolean
    userId?: boolean
    providerAccountId?: boolean
    credentialPublicKey?: boolean
    counter?: boolean
    credentialDeviceType?: boolean
    credentialBackedUp?: boolean
    transports?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["authenticator"]>

  export type AuthenticatorSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    credentialID?: boolean
    userId?: boolean
    providerAccountId?: boolean
    credentialPublicKey?: boolean
    counter?: boolean
    credentialDeviceType?: boolean
    credentialBackedUp?: boolean
    transports?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["authenticator"]>

  export type AuthenticatorSelectScalar = {
    credentialID?: boolean
    userId?: boolean
    providerAccountId?: boolean
    credentialPublicKey?: boolean
    counter?: boolean
    credentialDeviceType?: boolean
    credentialBackedUp?: boolean
    transports?: boolean
  }

  export type AuthenticatorOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"credentialID" | "userId" | "providerAccountId" | "credentialPublicKey" | "counter" | "credentialDeviceType" | "credentialBackedUp" | "transports", ExtArgs["result"]["authenticator"]>
  export type AuthenticatorInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AuthenticatorIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AuthenticatorIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AuthenticatorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Authenticator"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      credentialID: string
      userId: string
      providerAccountId: string
      credentialPublicKey: string
      counter: number
      credentialDeviceType: string
      credentialBackedUp: boolean
      transports: string | null
    }, ExtArgs["result"]["authenticator"]>
    composites: {}
  }

  type AuthenticatorGetPayload<S extends boolean | null | undefined | AuthenticatorDefaultArgs> = $Result.GetResult<Prisma.$AuthenticatorPayload, S>

  type AuthenticatorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AuthenticatorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AuthenticatorCountAggregateInputType | true
    }

  export interface AuthenticatorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Authenticator'], meta: { name: 'Authenticator' } }
    /**
     * Find zero or one Authenticator that matches the filter.
     * @param {AuthenticatorFindUniqueArgs} args - Arguments to find a Authenticator
     * @example
     * // Get one Authenticator
     * const authenticator = await prisma.authenticator.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuthenticatorFindUniqueArgs>(args: SelectSubset<T, AuthenticatorFindUniqueArgs<ExtArgs>>): Prisma__AuthenticatorClient<$Result.GetResult<Prisma.$AuthenticatorPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one Authenticator that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AuthenticatorFindUniqueOrThrowArgs} args - Arguments to find a Authenticator
     * @example
     * // Get one Authenticator
     * const authenticator = await prisma.authenticator.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuthenticatorFindUniqueOrThrowArgs>(args: SelectSubset<T, AuthenticatorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuthenticatorClient<$Result.GetResult<Prisma.$AuthenticatorPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first Authenticator that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthenticatorFindFirstArgs} args - Arguments to find a Authenticator
     * @example
     * // Get one Authenticator
     * const authenticator = await prisma.authenticator.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuthenticatorFindFirstArgs>(args?: SelectSubset<T, AuthenticatorFindFirstArgs<ExtArgs>>): Prisma__AuthenticatorClient<$Result.GetResult<Prisma.$AuthenticatorPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first Authenticator that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthenticatorFindFirstOrThrowArgs} args - Arguments to find a Authenticator
     * @example
     * // Get one Authenticator
     * const authenticator = await prisma.authenticator.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuthenticatorFindFirstOrThrowArgs>(args?: SelectSubset<T, AuthenticatorFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuthenticatorClient<$Result.GetResult<Prisma.$AuthenticatorPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Authenticators that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthenticatorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Authenticators
     * const authenticators = await prisma.authenticator.findMany()
     * 
     * // Get first 10 Authenticators
     * const authenticators = await prisma.authenticator.findMany({ take: 10 })
     * 
     * // Only select the `credentialID`
     * const authenticatorWithCredentialIDOnly = await prisma.authenticator.findMany({ select: { credentialID: true } })
     * 
     */
    findMany<T extends AuthenticatorFindManyArgs>(args?: SelectSubset<T, AuthenticatorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthenticatorPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a Authenticator.
     * @param {AuthenticatorCreateArgs} args - Arguments to create a Authenticator.
     * @example
     * // Create one Authenticator
     * const Authenticator = await prisma.authenticator.create({
     *   data: {
     *     // ... data to create a Authenticator
     *   }
     * })
     * 
     */
    create<T extends AuthenticatorCreateArgs>(args: SelectSubset<T, AuthenticatorCreateArgs<ExtArgs>>): Prisma__AuthenticatorClient<$Result.GetResult<Prisma.$AuthenticatorPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Authenticators.
     * @param {AuthenticatorCreateManyArgs} args - Arguments to create many Authenticators.
     * @example
     * // Create many Authenticators
     * const authenticator = await prisma.authenticator.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuthenticatorCreateManyArgs>(args?: SelectSubset<T, AuthenticatorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Authenticators and returns the data saved in the database.
     * @param {AuthenticatorCreateManyAndReturnArgs} args - Arguments to create many Authenticators.
     * @example
     * // Create many Authenticators
     * const authenticator = await prisma.authenticator.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Authenticators and only return the `credentialID`
     * const authenticatorWithCredentialIDOnly = await prisma.authenticator.createManyAndReturn({
     *   select: { credentialID: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuthenticatorCreateManyAndReturnArgs>(args?: SelectSubset<T, AuthenticatorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthenticatorPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a Authenticator.
     * @param {AuthenticatorDeleteArgs} args - Arguments to delete one Authenticator.
     * @example
     * // Delete one Authenticator
     * const Authenticator = await prisma.authenticator.delete({
     *   where: {
     *     // ... filter to delete one Authenticator
     *   }
     * })
     * 
     */
    delete<T extends AuthenticatorDeleteArgs>(args: SelectSubset<T, AuthenticatorDeleteArgs<ExtArgs>>): Prisma__AuthenticatorClient<$Result.GetResult<Prisma.$AuthenticatorPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one Authenticator.
     * @param {AuthenticatorUpdateArgs} args - Arguments to update one Authenticator.
     * @example
     * // Update one Authenticator
     * const authenticator = await prisma.authenticator.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuthenticatorUpdateArgs>(args: SelectSubset<T, AuthenticatorUpdateArgs<ExtArgs>>): Prisma__AuthenticatorClient<$Result.GetResult<Prisma.$AuthenticatorPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Authenticators.
     * @param {AuthenticatorDeleteManyArgs} args - Arguments to filter Authenticators to delete.
     * @example
     * // Delete a few Authenticators
     * const { count } = await prisma.authenticator.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuthenticatorDeleteManyArgs>(args?: SelectSubset<T, AuthenticatorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Authenticators.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthenticatorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Authenticators
     * const authenticator = await prisma.authenticator.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuthenticatorUpdateManyArgs>(args: SelectSubset<T, AuthenticatorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Authenticators and returns the data updated in the database.
     * @param {AuthenticatorUpdateManyAndReturnArgs} args - Arguments to update many Authenticators.
     * @example
     * // Update many Authenticators
     * const authenticator = await prisma.authenticator.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Authenticators and only return the `credentialID`
     * const authenticatorWithCredentialIDOnly = await prisma.authenticator.updateManyAndReturn({
     *   select: { credentialID: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AuthenticatorUpdateManyAndReturnArgs>(args: SelectSubset<T, AuthenticatorUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthenticatorPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one Authenticator.
     * @param {AuthenticatorUpsertArgs} args - Arguments to update or create a Authenticator.
     * @example
     * // Update or create a Authenticator
     * const authenticator = await prisma.authenticator.upsert({
     *   create: {
     *     // ... data to create a Authenticator
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Authenticator we want to update
     *   }
     * })
     */
    upsert<T extends AuthenticatorUpsertArgs>(args: SelectSubset<T, AuthenticatorUpsertArgs<ExtArgs>>): Prisma__AuthenticatorClient<$Result.GetResult<Prisma.$AuthenticatorPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Authenticators.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthenticatorCountArgs} args - Arguments to filter Authenticators to count.
     * @example
     * // Count the number of Authenticators
     * const count = await prisma.authenticator.count({
     *   where: {
     *     // ... the filter for the Authenticators we want to count
     *   }
     * })
    **/
    count<T extends AuthenticatorCountArgs>(
      args?: Subset<T, AuthenticatorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuthenticatorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Authenticator.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthenticatorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuthenticatorAggregateArgs>(args: Subset<T, AuthenticatorAggregateArgs>): Prisma.PrismaPromise<GetAuthenticatorAggregateType<T>>

    /**
     * Group by Authenticator.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthenticatorGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuthenticatorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuthenticatorGroupByArgs['orderBy'] }
        : { orderBy?: AuthenticatorGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuthenticatorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuthenticatorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Authenticator model
   */
  readonly fields: AuthenticatorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Authenticator.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuthenticatorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Authenticator model
   */ 
  interface AuthenticatorFieldRefs {
    readonly credentialID: FieldRef<"Authenticator", 'String'>
    readonly userId: FieldRef<"Authenticator", 'String'>
    readonly providerAccountId: FieldRef<"Authenticator", 'String'>
    readonly credentialPublicKey: FieldRef<"Authenticator", 'String'>
    readonly counter: FieldRef<"Authenticator", 'Int'>
    readonly credentialDeviceType: FieldRef<"Authenticator", 'String'>
    readonly credentialBackedUp: FieldRef<"Authenticator", 'Boolean'>
    readonly transports: FieldRef<"Authenticator", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Authenticator findUnique
   */
  export type AuthenticatorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Authenticator
     */
    select?: AuthenticatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Authenticator
     */
    omit?: AuthenticatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthenticatorInclude<ExtArgs> | null
    /**
     * Filter, which Authenticator to fetch.
     */
    where: AuthenticatorWhereUniqueInput
  }

  /**
   * Authenticator findUniqueOrThrow
   */
  export type AuthenticatorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Authenticator
     */
    select?: AuthenticatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Authenticator
     */
    omit?: AuthenticatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthenticatorInclude<ExtArgs> | null
    /**
     * Filter, which Authenticator to fetch.
     */
    where: AuthenticatorWhereUniqueInput
  }

  /**
   * Authenticator findFirst
   */
  export type AuthenticatorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Authenticator
     */
    select?: AuthenticatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Authenticator
     */
    omit?: AuthenticatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthenticatorInclude<ExtArgs> | null
    /**
     * Filter, which Authenticator to fetch.
     */
    where?: AuthenticatorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Authenticators to fetch.
     */
    orderBy?: AuthenticatorOrderByWithRelationInput | AuthenticatorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Authenticators.
     */
    cursor?: AuthenticatorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Authenticators from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Authenticators.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Authenticators.
     */
    distinct?: AuthenticatorScalarFieldEnum | AuthenticatorScalarFieldEnum[]
  }

  /**
   * Authenticator findFirstOrThrow
   */
  export type AuthenticatorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Authenticator
     */
    select?: AuthenticatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Authenticator
     */
    omit?: AuthenticatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthenticatorInclude<ExtArgs> | null
    /**
     * Filter, which Authenticator to fetch.
     */
    where?: AuthenticatorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Authenticators to fetch.
     */
    orderBy?: AuthenticatorOrderByWithRelationInput | AuthenticatorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Authenticators.
     */
    cursor?: AuthenticatorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Authenticators from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Authenticators.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Authenticators.
     */
    distinct?: AuthenticatorScalarFieldEnum | AuthenticatorScalarFieldEnum[]
  }

  /**
   * Authenticator findMany
   */
  export type AuthenticatorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Authenticator
     */
    select?: AuthenticatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Authenticator
     */
    omit?: AuthenticatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthenticatorInclude<ExtArgs> | null
    /**
     * Filter, which Authenticators to fetch.
     */
    where?: AuthenticatorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Authenticators to fetch.
     */
    orderBy?: AuthenticatorOrderByWithRelationInput | AuthenticatorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Authenticators.
     */
    cursor?: AuthenticatorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Authenticators from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Authenticators.
     */
    skip?: number
    distinct?: AuthenticatorScalarFieldEnum | AuthenticatorScalarFieldEnum[]
  }

  /**
   * Authenticator create
   */
  export type AuthenticatorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Authenticator
     */
    select?: AuthenticatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Authenticator
     */
    omit?: AuthenticatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthenticatorInclude<ExtArgs> | null
    /**
     * The data needed to create a Authenticator.
     */
    data: XOR<AuthenticatorCreateInput, AuthenticatorUncheckedCreateInput>
  }

  /**
   * Authenticator createMany
   */
  export type AuthenticatorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Authenticators.
     */
    data: AuthenticatorCreateManyInput | AuthenticatorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Authenticator createManyAndReturn
   */
  export type AuthenticatorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Authenticator
     */
    select?: AuthenticatorSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Authenticator
     */
    omit?: AuthenticatorOmit<ExtArgs> | null
    /**
     * The data used to create many Authenticators.
     */
    data: AuthenticatorCreateManyInput | AuthenticatorCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthenticatorIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Authenticator update
   */
  export type AuthenticatorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Authenticator
     */
    select?: AuthenticatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Authenticator
     */
    omit?: AuthenticatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthenticatorInclude<ExtArgs> | null
    /**
     * The data needed to update a Authenticator.
     */
    data: XOR<AuthenticatorUpdateInput, AuthenticatorUncheckedUpdateInput>
    /**
     * Choose, which Authenticator to update.
     */
    where: AuthenticatorWhereUniqueInput
  }

  /**
   * Authenticator updateMany
   */
  export type AuthenticatorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Authenticators.
     */
    data: XOR<AuthenticatorUpdateManyMutationInput, AuthenticatorUncheckedUpdateManyInput>
    /**
     * Filter which Authenticators to update
     */
    where?: AuthenticatorWhereInput
    /**
     * Limit how many Authenticators to update.
     */
    limit?: number
  }

  /**
   * Authenticator updateManyAndReturn
   */
  export type AuthenticatorUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Authenticator
     */
    select?: AuthenticatorSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Authenticator
     */
    omit?: AuthenticatorOmit<ExtArgs> | null
    /**
     * The data used to update Authenticators.
     */
    data: XOR<AuthenticatorUpdateManyMutationInput, AuthenticatorUncheckedUpdateManyInput>
    /**
     * Filter which Authenticators to update
     */
    where?: AuthenticatorWhereInput
    /**
     * Limit how many Authenticators to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthenticatorIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Authenticator upsert
   */
  export type AuthenticatorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Authenticator
     */
    select?: AuthenticatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Authenticator
     */
    omit?: AuthenticatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthenticatorInclude<ExtArgs> | null
    /**
     * The filter to search for the Authenticator to update in case it exists.
     */
    where: AuthenticatorWhereUniqueInput
    /**
     * In case the Authenticator found by the `where` argument doesn't exist, create a new Authenticator with this data.
     */
    create: XOR<AuthenticatorCreateInput, AuthenticatorUncheckedCreateInput>
    /**
     * In case the Authenticator was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuthenticatorUpdateInput, AuthenticatorUncheckedUpdateInput>
  }

  /**
   * Authenticator delete
   */
  export type AuthenticatorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Authenticator
     */
    select?: AuthenticatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Authenticator
     */
    omit?: AuthenticatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthenticatorInclude<ExtArgs> | null
    /**
     * Filter which Authenticator to delete.
     */
    where: AuthenticatorWhereUniqueInput
  }

  /**
   * Authenticator deleteMany
   */
  export type AuthenticatorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Authenticators to delete
     */
    where?: AuthenticatorWhereInput
    /**
     * Limit how many Authenticators to delete.
     */
    limit?: number
  }

  /**
   * Authenticator without action
   */
  export type AuthenticatorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Authenticator
     */
    select?: AuthenticatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Authenticator
     */
    omit?: AuthenticatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthenticatorInclude<ExtArgs> | null
  }


  /**
   * Model Notification
   */

  export type AggregateNotification = {
    _count: NotificationCountAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  export type NotificationMinAggregateOutputType = {
    id: string | null
    message: string | null
    notifyAt: Date | null
    read: boolean | null
    userId: string | null
    animalId: string | null
    createdAt: Date | null
  }

  export type NotificationMaxAggregateOutputType = {
    id: string | null
    message: string | null
    notifyAt: Date | null
    read: boolean | null
    userId: string | null
    animalId: string | null
    createdAt: Date | null
  }

  export type NotificationCountAggregateOutputType = {
    id: number
    message: number
    notifyAt: number
    read: number
    userId: number
    animalId: number
    createdAt: number
    _all: number
  }


  export type NotificationMinAggregateInputType = {
    id?: true
    message?: true
    notifyAt?: true
    read?: true
    userId?: true
    animalId?: true
    createdAt?: true
  }

  export type NotificationMaxAggregateInputType = {
    id?: true
    message?: true
    notifyAt?: true
    read?: true
    userId?: true
    animalId?: true
    createdAt?: true
  }

  export type NotificationCountAggregateInputType = {
    id?: true
    message?: true
    notifyAt?: true
    read?: true
    userId?: true
    animalId?: true
    createdAt?: true
    _all?: true
  }

  export type NotificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notification to aggregate.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Notifications
    **/
    _count?: true | NotificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificationMaxAggregateInputType
  }

  export type GetNotificationAggregateType<T extends NotificationAggregateArgs> = {
        [P in keyof T & keyof AggregateNotification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotification[P]>
      : GetScalarType<T[P], AggregateNotification[P]>
  }




  export type NotificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithAggregationInput | NotificationOrderByWithAggregationInput[]
    by: NotificationScalarFieldEnum[] | NotificationScalarFieldEnum
    having?: NotificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificationCountAggregateInputType | true
    _min?: NotificationMinAggregateInputType
    _max?: NotificationMaxAggregateInputType
  }

  export type NotificationGroupByOutputType = {
    id: string
    message: string
    notifyAt: Date
    read: boolean
    userId: string
    animalId: string
    createdAt: Date
    _count: NotificationCountAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  type GetNotificationGroupByPayload<T extends NotificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificationGroupByOutputType[P]>
            : GetScalarType<T[P], NotificationGroupByOutputType[P]>
        }
      >
    >


  export type NotificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    message?: boolean
    notifyAt?: boolean
    read?: boolean
    userId?: boolean
    animalId?: boolean
    createdAt?: boolean
    Animal?: boolean | AnimalDefaultArgs<ExtArgs>
    User?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    message?: boolean
    notifyAt?: boolean
    read?: boolean
    userId?: boolean
    animalId?: boolean
    createdAt?: boolean
    Animal?: boolean | AnimalDefaultArgs<ExtArgs>
    User?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    message?: boolean
    notifyAt?: boolean
    read?: boolean
    userId?: boolean
    animalId?: boolean
    createdAt?: boolean
    Animal?: boolean | AnimalDefaultArgs<ExtArgs>
    User?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectScalar = {
    id?: boolean
    message?: boolean
    notifyAt?: boolean
    read?: boolean
    userId?: boolean
    animalId?: boolean
    createdAt?: boolean
  }

  export type NotificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "message" | "notifyAt" | "read" | "userId" | "animalId" | "createdAt", ExtArgs["result"]["notification"]>
  export type NotificationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Animal?: boolean | AnimalDefaultArgs<ExtArgs>
    User?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type NotificationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Animal?: boolean | AnimalDefaultArgs<ExtArgs>
    User?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type NotificationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Animal?: boolean | AnimalDefaultArgs<ExtArgs>
    User?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $NotificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Notification"
    objects: {
      Animal: Prisma.$AnimalPayload<ExtArgs>
      User: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      message: string
      notifyAt: Date
      read: boolean
      userId: string
      animalId: string
      createdAt: Date
    }, ExtArgs["result"]["notification"]>
    composites: {}
  }

  type NotificationGetPayload<S extends boolean | null | undefined | NotificationDefaultArgs> = $Result.GetResult<Prisma.$NotificationPayload, S>

  type NotificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NotificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NotificationCountAggregateInputType | true
    }

  export interface NotificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Notification'], meta: { name: 'Notification' } }
    /**
     * Find zero or one Notification that matches the filter.
     * @param {NotificationFindUniqueArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotificationFindUniqueArgs>(args: SelectSubset<T, NotificationFindUniqueArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one Notification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NotificationFindUniqueOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotificationFindUniqueOrThrowArgs>(args: SelectSubset<T, NotificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first Notification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotificationFindFirstArgs>(args?: SelectSubset<T, NotificationFindFirstArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first Notification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotificationFindFirstOrThrowArgs>(args?: SelectSubset<T, NotificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Notifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notifications
     * const notifications = await prisma.notification.findMany()
     * 
     * // Get first 10 Notifications
     * const notifications = await prisma.notification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notificationWithIdOnly = await prisma.notification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NotificationFindManyArgs>(args?: SelectSubset<T, NotificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a Notification.
     * @param {NotificationCreateArgs} args - Arguments to create a Notification.
     * @example
     * // Create one Notification
     * const Notification = await prisma.notification.create({
     *   data: {
     *     // ... data to create a Notification
     *   }
     * })
     * 
     */
    create<T extends NotificationCreateArgs>(args: SelectSubset<T, NotificationCreateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Notifications.
     * @param {NotificationCreateManyArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NotificationCreateManyArgs>(args?: SelectSubset<T, NotificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Notifications and returns the data saved in the database.
     * @param {NotificationCreateManyAndReturnArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Notifications and only return the `id`
     * const notificationWithIdOnly = await prisma.notification.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NotificationCreateManyAndReturnArgs>(args?: SelectSubset<T, NotificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a Notification.
     * @param {NotificationDeleteArgs} args - Arguments to delete one Notification.
     * @example
     * // Delete one Notification
     * const Notification = await prisma.notification.delete({
     *   where: {
     *     // ... filter to delete one Notification
     *   }
     * })
     * 
     */
    delete<T extends NotificationDeleteArgs>(args: SelectSubset<T, NotificationDeleteArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one Notification.
     * @param {NotificationUpdateArgs} args - Arguments to update one Notification.
     * @example
     * // Update one Notification
     * const notification = await prisma.notification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NotificationUpdateArgs>(args: SelectSubset<T, NotificationUpdateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Notifications.
     * @param {NotificationDeleteManyArgs} args - Arguments to filter Notifications to delete.
     * @example
     * // Delete a few Notifications
     * const { count } = await prisma.notification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NotificationDeleteManyArgs>(args?: SelectSubset<T, NotificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NotificationUpdateManyArgs>(args: SelectSubset<T, NotificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications and returns the data updated in the database.
     * @param {NotificationUpdateManyAndReturnArgs} args - Arguments to update many Notifications.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Notifications and only return the `id`
     * const notificationWithIdOnly = await prisma.notification.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends NotificationUpdateManyAndReturnArgs>(args: SelectSubset<T, NotificationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one Notification.
     * @param {NotificationUpsertArgs} args - Arguments to update or create a Notification.
     * @example
     * // Update or create a Notification
     * const notification = await prisma.notification.upsert({
     *   create: {
     *     // ... data to create a Notification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Notification we want to update
     *   }
     * })
     */
    upsert<T extends NotificationUpsertArgs>(args: SelectSubset<T, NotificationUpsertArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationCountArgs} args - Arguments to filter Notifications to count.
     * @example
     * // Count the number of Notifications
     * const count = await prisma.notification.count({
     *   where: {
     *     // ... the filter for the Notifications we want to count
     *   }
     * })
    **/
    count<T extends NotificationCountArgs>(
      args?: Subset<T, NotificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NotificationAggregateArgs>(args: Subset<T, NotificationAggregateArgs>): Prisma.PrismaPromise<GetNotificationAggregateType<T>>

    /**
     * Group by Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NotificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotificationGroupByArgs['orderBy'] }
        : { orderBy?: NotificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NotificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Notification model
   */
  readonly fields: NotificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Notification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NotificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Animal<T extends AnimalDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AnimalDefaultArgs<ExtArgs>>): Prisma__AnimalClient<$Result.GetResult<Prisma.$AnimalPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    User<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Notification model
   */ 
  interface NotificationFieldRefs {
    readonly id: FieldRef<"Notification", 'String'>
    readonly message: FieldRef<"Notification", 'String'>
    readonly notifyAt: FieldRef<"Notification", 'DateTime'>
    readonly read: FieldRef<"Notification", 'Boolean'>
    readonly userId: FieldRef<"Notification", 'String'>
    readonly animalId: FieldRef<"Notification", 'String'>
    readonly createdAt: FieldRef<"Notification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Notification findUnique
   */
  export type NotificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findUniqueOrThrow
   */
  export type NotificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findFirst
   */
  export type NotificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findFirstOrThrow
   */
  export type NotificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findMany
   */
  export type NotificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notifications to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification create
   */
  export type NotificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to create a Notification.
     */
    data: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
  }

  /**
   * Notification createMany
   */
  export type NotificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Notification createManyAndReturn
   */
  export type NotificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Notification update
   */
  export type NotificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to update a Notification.
     */
    data: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
    /**
     * Choose, which Notification to update.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification updateMany
   */
  export type NotificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to update.
     */
    limit?: number
  }

  /**
   * Notification updateManyAndReturn
   */
  export type NotificationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Notification upsert
   */
  export type NotificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The filter to search for the Notification to update in case it exists.
     */
    where: NotificationWhereUniqueInput
    /**
     * In case the Notification found by the `where` argument doesn't exist, create a new Notification with this data.
     */
    create: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
    /**
     * In case the Notification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
  }

  /**
   * Notification delete
   */
  export type NotificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter which Notification to delete.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification deleteMany
   */
  export type NotificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notifications to delete
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to delete.
     */
    limit?: number
  }

  /**
   * Notification without action
   */
  export type NotificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    cnpj: 'cnpj',
    password: 'password',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    emailVerified: 'emailVerified',
    image: 'image'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const AnimalScalarFieldEnum: {
    id: 'id',
    manualId: 'manualId',
    gender: 'gender',
    birthDate: 'birthDate',
    weight: 'weight',
    breed: 'breed',
    category: 'category',
    motherId: 'motherId',
    fatherId: 'fatherId',
    reproductiveStatus: 'reproductiveStatus',
    handlingType: 'handlingType',
    bullId: 'bullId',
    protocol: 'protocol',
    andrological: 'andrological',
    expectedDueDate: 'expectedDueDate',
    fetalGender: 'fetalGender',
    bullIatf: 'bullIatf',
    bodyConditionScore: 'bodyConditionScore',
    observations: 'observations',
    ownerId: 'ownerId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    dewormingDate: 'dewormingDate',
    dewormingExpiry: 'dewormingExpiry',
    dewormingName: 'dewormingName',
    status: 'status',
    vaccineDate: 'vaccineDate',
    vaccineExpiry: 'vaccineExpiry',
    vaccineName: 'vaccineName'
  };

  export type AnimalScalarFieldEnum = (typeof AnimalScalarFieldEnum)[keyof typeof AnimalScalarFieldEnum]


  export const DiseaseScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    date: 'date',
    animalId: 'animalId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DiseaseScalarFieldEnum = (typeof DiseaseScalarFieldEnum)[keyof typeof DiseaseScalarFieldEnum]


  export const VaccineScalarFieldEnum: {
    name: 'name',
    description: 'description',
    date: 'date',
    animalId: 'animalId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    expiryDate: 'expiryDate',
    id: 'id'
  };

  export type VaccineScalarFieldEnum = (typeof VaccineScalarFieldEnum)[keyof typeof VaccineScalarFieldEnum]


  export const DewormingScalarFieldEnum: {
    id: 'id',
    name: 'name',
    date: 'date',
    animalId: 'animalId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DewormingScalarFieldEnum = (typeof DewormingScalarFieldEnum)[keyof typeof DewormingScalarFieldEnum]


  export const AccountScalarFieldEnum: {
    userId: 'userId',
    type: 'type',
    provider: 'provider',
    providerAccountId: 'providerAccountId',
    refresh_token: 'refresh_token',
    access_token: 'access_token',
    expires_at: 'expires_at',
    token_type: 'token_type',
    scope: 'scope',
    id_token: 'id_token',
    session_state: 'session_state',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    sessionToken: 'sessionToken',
    userId: 'userId',
    expires: 'expires',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const VerificationTokenScalarFieldEnum: {
    identifier: 'identifier',
    token: 'token',
    expires: 'expires'
  };

  export type VerificationTokenScalarFieldEnum = (typeof VerificationTokenScalarFieldEnum)[keyof typeof VerificationTokenScalarFieldEnum]


  export const AuthenticatorScalarFieldEnum: {
    credentialID: 'credentialID',
    userId: 'userId',
    providerAccountId: 'providerAccountId',
    credentialPublicKey: 'credentialPublicKey',
    counter: 'counter',
    credentialDeviceType: 'credentialDeviceType',
    credentialBackedUp: 'credentialBackedUp',
    transports: 'transports'
  };

  export type AuthenticatorScalarFieldEnum = (typeof AuthenticatorScalarFieldEnum)[keyof typeof AuthenticatorScalarFieldEnum]


  export const NotificationScalarFieldEnum: {
    id: 'id',
    message: 'message',
    notifyAt: 'notifyAt',
    read: 'read',
    userId: 'userId',
    animalId: 'animalId',
    createdAt: 'createdAt'
  };

  export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    cnpj?: StringNullableFilter<"User"> | string | null
    password?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    emailVerified?: DateTimeNullableFilter<"User"> | Date | string | null
    image?: StringNullableFilter<"User"> | string | null
    accounts?: AccountListRelationFilter
    animals?: AnimalListRelationFilter
    Authenticator?: AuthenticatorListRelationFilter
    Notification?: NotificationListRelationFilter
    sessions?: SessionListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    cnpj?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    emailVerified?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    accounts?: AccountOrderByRelationAggregateInput
    animals?: AnimalOrderByRelationAggregateInput
    Authenticator?: AuthenticatorOrderByRelationAggregateInput
    Notification?: NotificationOrderByRelationAggregateInput
    sessions?: SessionOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    cnpj?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    password?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    emailVerified?: DateTimeNullableFilter<"User"> | Date | string | null
    image?: StringNullableFilter<"User"> | string | null
    accounts?: AccountListRelationFilter
    animals?: AnimalListRelationFilter
    Authenticator?: AuthenticatorListRelationFilter
    Notification?: NotificationListRelationFilter
    sessions?: SessionListRelationFilter
  }, "id" | "email" | "cnpj">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    cnpj?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    emailVerified?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    cnpj?: StringNullableWithAggregatesFilter<"User"> | string | null
    password?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    emailVerified?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    image?: StringNullableWithAggregatesFilter<"User"> | string | null
  }

  export type AnimalWhereInput = {
    AND?: AnimalWhereInput | AnimalWhereInput[]
    OR?: AnimalWhereInput[]
    NOT?: AnimalWhereInput | AnimalWhereInput[]
    id?: StringFilter<"Animal"> | string
    manualId?: StringFilter<"Animal"> | string
    gender?: StringFilter<"Animal"> | string
    birthDate?: DateTimeFilter<"Animal"> | Date | string
    weight?: FloatFilter<"Animal"> | number
    breed?: StringFilter<"Animal"> | string
    category?: StringFilter<"Animal"> | string
    motherId?: StringNullableFilter<"Animal"> | string | null
    fatherId?: StringNullableFilter<"Animal"> | string | null
    reproductiveStatus?: StringNullableFilter<"Animal"> | string | null
    handlingType?: StringNullableFilter<"Animal"> | string | null
    bullId?: StringNullableFilter<"Animal"> | string | null
    protocol?: StringNullableFilter<"Animal"> | string | null
    andrological?: StringNullableFilter<"Animal"> | string | null
    expectedDueDate?: DateTimeNullableFilter<"Animal"> | Date | string | null
    fetalGender?: StringNullableFilter<"Animal"> | string | null
    bullIatf?: StringNullableFilter<"Animal"> | string | null
    bodyConditionScore?: FloatNullableFilter<"Animal"> | number | null
    observations?: StringNullableFilter<"Animal"> | string | null
    ownerId?: StringFilter<"Animal"> | string
    createdAt?: DateTimeFilter<"Animal"> | Date | string
    updatedAt?: DateTimeFilter<"Animal"> | Date | string
    dewormingDate?: DateTimeNullableFilter<"Animal"> | Date | string | null
    dewormingExpiry?: DateTimeNullableFilter<"Animal"> | Date | string | null
    dewormingName?: StringNullableFilter<"Animal"> | string | null
    status?: StringFilter<"Animal"> | string
    vaccineDate?: DateTimeNullableFilter<"Animal"> | Date | string | null
    vaccineExpiry?: DateTimeNullableFilter<"Animal"> | Date | string | null
    vaccineName?: StringNullableFilter<"Animal"> | string | null
    bull?: XOR<AnimalNullableScalarRelationFilter, AnimalWhereInput> | null
    offspringFromBull?: AnimalListRelationFilter
    father?: XOR<AnimalNullableScalarRelationFilter, AnimalWhereInput> | null
    offspringFromFather?: AnimalListRelationFilter
    mother?: XOR<AnimalNullableScalarRelationFilter, AnimalWhereInput> | null
    offspringFromMother?: AnimalListRelationFilter
    owner?: XOR<UserScalarRelationFilter, UserWhereInput>
    dewormings?: DewormingListRelationFilter
    diseases?: DiseaseListRelationFilter
    Notification?: NotificationListRelationFilter
    vaccines?: VaccineListRelationFilter
  }

  export type AnimalOrderByWithRelationInput = {
    id?: SortOrder
    manualId?: SortOrder
    gender?: SortOrder
    birthDate?: SortOrder
    weight?: SortOrder
    breed?: SortOrder
    category?: SortOrder
    motherId?: SortOrderInput | SortOrder
    fatherId?: SortOrderInput | SortOrder
    reproductiveStatus?: SortOrderInput | SortOrder
    handlingType?: SortOrderInput | SortOrder
    bullId?: SortOrderInput | SortOrder
    protocol?: SortOrderInput | SortOrder
    andrological?: SortOrderInput | SortOrder
    expectedDueDate?: SortOrderInput | SortOrder
    fetalGender?: SortOrderInput | SortOrder
    bullIatf?: SortOrderInput | SortOrder
    bodyConditionScore?: SortOrderInput | SortOrder
    observations?: SortOrderInput | SortOrder
    ownerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    dewormingDate?: SortOrderInput | SortOrder
    dewormingExpiry?: SortOrderInput | SortOrder
    dewormingName?: SortOrderInput | SortOrder
    status?: SortOrder
    vaccineDate?: SortOrderInput | SortOrder
    vaccineExpiry?: SortOrderInput | SortOrder
    vaccineName?: SortOrderInput | SortOrder
    bull?: AnimalOrderByWithRelationInput
    offspringFromBull?: AnimalOrderByRelationAggregateInput
    father?: AnimalOrderByWithRelationInput
    offspringFromFather?: AnimalOrderByRelationAggregateInput
    mother?: AnimalOrderByWithRelationInput
    offspringFromMother?: AnimalOrderByRelationAggregateInput
    owner?: UserOrderByWithRelationInput
    dewormings?: DewormingOrderByRelationAggregateInput
    diseases?: DiseaseOrderByRelationAggregateInput
    Notification?: NotificationOrderByRelationAggregateInput
    vaccines?: VaccineOrderByRelationAggregateInput
  }

  export type AnimalWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    manualId_ownerId?: AnimalManualIdOwnerIdCompoundUniqueInput
    AND?: AnimalWhereInput | AnimalWhereInput[]
    OR?: AnimalWhereInput[]
    NOT?: AnimalWhereInput | AnimalWhereInput[]
    manualId?: StringFilter<"Animal"> | string
    gender?: StringFilter<"Animal"> | string
    birthDate?: DateTimeFilter<"Animal"> | Date | string
    weight?: FloatFilter<"Animal"> | number
    breed?: StringFilter<"Animal"> | string
    category?: StringFilter<"Animal"> | string
    motherId?: StringNullableFilter<"Animal"> | string | null
    fatherId?: StringNullableFilter<"Animal"> | string | null
    reproductiveStatus?: StringNullableFilter<"Animal"> | string | null
    handlingType?: StringNullableFilter<"Animal"> | string | null
    bullId?: StringNullableFilter<"Animal"> | string | null
    protocol?: StringNullableFilter<"Animal"> | string | null
    andrological?: StringNullableFilter<"Animal"> | string | null
    expectedDueDate?: DateTimeNullableFilter<"Animal"> | Date | string | null
    fetalGender?: StringNullableFilter<"Animal"> | string | null
    bullIatf?: StringNullableFilter<"Animal"> | string | null
    bodyConditionScore?: FloatNullableFilter<"Animal"> | number | null
    observations?: StringNullableFilter<"Animal"> | string | null
    ownerId?: StringFilter<"Animal"> | string
    createdAt?: DateTimeFilter<"Animal"> | Date | string
    updatedAt?: DateTimeFilter<"Animal"> | Date | string
    dewormingDate?: DateTimeNullableFilter<"Animal"> | Date | string | null
    dewormingExpiry?: DateTimeNullableFilter<"Animal"> | Date | string | null
    dewormingName?: StringNullableFilter<"Animal"> | string | null
    status?: StringFilter<"Animal"> | string
    vaccineDate?: DateTimeNullableFilter<"Animal"> | Date | string | null
    vaccineExpiry?: DateTimeNullableFilter<"Animal"> | Date | string | null
    vaccineName?: StringNullableFilter<"Animal"> | string | null
    bull?: XOR<AnimalNullableScalarRelationFilter, AnimalWhereInput> | null
    offspringFromBull?: AnimalListRelationFilter
    father?: XOR<AnimalNullableScalarRelationFilter, AnimalWhereInput> | null
    offspringFromFather?: AnimalListRelationFilter
    mother?: XOR<AnimalNullableScalarRelationFilter, AnimalWhereInput> | null
    offspringFromMother?: AnimalListRelationFilter
    owner?: XOR<UserScalarRelationFilter, UserWhereInput>
    dewormings?: DewormingListRelationFilter
    diseases?: DiseaseListRelationFilter
    Notification?: NotificationListRelationFilter
    vaccines?: VaccineListRelationFilter
  }, "id" | "manualId_ownerId">

  export type AnimalOrderByWithAggregationInput = {
    id?: SortOrder
    manualId?: SortOrder
    gender?: SortOrder
    birthDate?: SortOrder
    weight?: SortOrder
    breed?: SortOrder
    category?: SortOrder
    motherId?: SortOrderInput | SortOrder
    fatherId?: SortOrderInput | SortOrder
    reproductiveStatus?: SortOrderInput | SortOrder
    handlingType?: SortOrderInput | SortOrder
    bullId?: SortOrderInput | SortOrder
    protocol?: SortOrderInput | SortOrder
    andrological?: SortOrderInput | SortOrder
    expectedDueDate?: SortOrderInput | SortOrder
    fetalGender?: SortOrderInput | SortOrder
    bullIatf?: SortOrderInput | SortOrder
    bodyConditionScore?: SortOrderInput | SortOrder
    observations?: SortOrderInput | SortOrder
    ownerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    dewormingDate?: SortOrderInput | SortOrder
    dewormingExpiry?: SortOrderInput | SortOrder
    dewormingName?: SortOrderInput | SortOrder
    status?: SortOrder
    vaccineDate?: SortOrderInput | SortOrder
    vaccineExpiry?: SortOrderInput | SortOrder
    vaccineName?: SortOrderInput | SortOrder
    _count?: AnimalCountOrderByAggregateInput
    _avg?: AnimalAvgOrderByAggregateInput
    _max?: AnimalMaxOrderByAggregateInput
    _min?: AnimalMinOrderByAggregateInput
    _sum?: AnimalSumOrderByAggregateInput
  }

  export type AnimalScalarWhereWithAggregatesInput = {
    AND?: AnimalScalarWhereWithAggregatesInput | AnimalScalarWhereWithAggregatesInput[]
    OR?: AnimalScalarWhereWithAggregatesInput[]
    NOT?: AnimalScalarWhereWithAggregatesInput | AnimalScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Animal"> | string
    manualId?: StringWithAggregatesFilter<"Animal"> | string
    gender?: StringWithAggregatesFilter<"Animal"> | string
    birthDate?: DateTimeWithAggregatesFilter<"Animal"> | Date | string
    weight?: FloatWithAggregatesFilter<"Animal"> | number
    breed?: StringWithAggregatesFilter<"Animal"> | string
    category?: StringWithAggregatesFilter<"Animal"> | string
    motherId?: StringNullableWithAggregatesFilter<"Animal"> | string | null
    fatherId?: StringNullableWithAggregatesFilter<"Animal"> | string | null
    reproductiveStatus?: StringNullableWithAggregatesFilter<"Animal"> | string | null
    handlingType?: StringNullableWithAggregatesFilter<"Animal"> | string | null
    bullId?: StringNullableWithAggregatesFilter<"Animal"> | string | null
    protocol?: StringNullableWithAggregatesFilter<"Animal"> | string | null
    andrological?: StringNullableWithAggregatesFilter<"Animal"> | string | null
    expectedDueDate?: DateTimeNullableWithAggregatesFilter<"Animal"> | Date | string | null
    fetalGender?: StringNullableWithAggregatesFilter<"Animal"> | string | null
    bullIatf?: StringNullableWithAggregatesFilter<"Animal"> | string | null
    bodyConditionScore?: FloatNullableWithAggregatesFilter<"Animal"> | number | null
    observations?: StringNullableWithAggregatesFilter<"Animal"> | string | null
    ownerId?: StringWithAggregatesFilter<"Animal"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Animal"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Animal"> | Date | string
    dewormingDate?: DateTimeNullableWithAggregatesFilter<"Animal"> | Date | string | null
    dewormingExpiry?: DateTimeNullableWithAggregatesFilter<"Animal"> | Date | string | null
    dewormingName?: StringNullableWithAggregatesFilter<"Animal"> | string | null
    status?: StringWithAggregatesFilter<"Animal"> | string
    vaccineDate?: DateTimeNullableWithAggregatesFilter<"Animal"> | Date | string | null
    vaccineExpiry?: DateTimeNullableWithAggregatesFilter<"Animal"> | Date | string | null
    vaccineName?: StringNullableWithAggregatesFilter<"Animal"> | string | null
  }

  export type DiseaseWhereInput = {
    AND?: DiseaseWhereInput | DiseaseWhereInput[]
    OR?: DiseaseWhereInput[]
    NOT?: DiseaseWhereInput | DiseaseWhereInput[]
    id?: StringFilter<"Disease"> | string
    name?: StringFilter<"Disease"> | string
    description?: StringNullableFilter<"Disease"> | string | null
    date?: DateTimeFilter<"Disease"> | Date | string
    animalId?: StringFilter<"Disease"> | string
    createdAt?: DateTimeFilter<"Disease"> | Date | string
    updatedAt?: DateTimeFilter<"Disease"> | Date | string
    animal?: XOR<AnimalScalarRelationFilter, AnimalWhereInput>
  }

  export type DiseaseOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    date?: SortOrder
    animalId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    animal?: AnimalOrderByWithRelationInput
  }

  export type DiseaseWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DiseaseWhereInput | DiseaseWhereInput[]
    OR?: DiseaseWhereInput[]
    NOT?: DiseaseWhereInput | DiseaseWhereInput[]
    name?: StringFilter<"Disease"> | string
    description?: StringNullableFilter<"Disease"> | string | null
    date?: DateTimeFilter<"Disease"> | Date | string
    animalId?: StringFilter<"Disease"> | string
    createdAt?: DateTimeFilter<"Disease"> | Date | string
    updatedAt?: DateTimeFilter<"Disease"> | Date | string
    animal?: XOR<AnimalScalarRelationFilter, AnimalWhereInput>
  }, "id">

  export type DiseaseOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    date?: SortOrder
    animalId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DiseaseCountOrderByAggregateInput
    _max?: DiseaseMaxOrderByAggregateInput
    _min?: DiseaseMinOrderByAggregateInput
  }

  export type DiseaseScalarWhereWithAggregatesInput = {
    AND?: DiseaseScalarWhereWithAggregatesInput | DiseaseScalarWhereWithAggregatesInput[]
    OR?: DiseaseScalarWhereWithAggregatesInput[]
    NOT?: DiseaseScalarWhereWithAggregatesInput | DiseaseScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Disease"> | string
    name?: StringWithAggregatesFilter<"Disease"> | string
    description?: StringNullableWithAggregatesFilter<"Disease"> | string | null
    date?: DateTimeWithAggregatesFilter<"Disease"> | Date | string
    animalId?: StringWithAggregatesFilter<"Disease"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Disease"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Disease"> | Date | string
  }

  export type VaccineWhereInput = {
    AND?: VaccineWhereInput | VaccineWhereInput[]
    OR?: VaccineWhereInput[]
    NOT?: VaccineWhereInput | VaccineWhereInput[]
    name?: StringFilter<"Vaccine"> | string
    description?: StringNullableFilter<"Vaccine"> | string | null
    date?: DateTimeFilter<"Vaccine"> | Date | string
    animalId?: StringFilter<"Vaccine"> | string
    createdAt?: DateTimeFilter<"Vaccine"> | Date | string
    updatedAt?: DateTimeFilter<"Vaccine"> | Date | string
    expiryDate?: DateTimeFilter<"Vaccine"> | Date | string
    id?: UuidFilter<"Vaccine"> | string
    animal?: XOR<AnimalScalarRelationFilter, AnimalWhereInput>
  }

  export type VaccineOrderByWithRelationInput = {
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    date?: SortOrder
    animalId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    expiryDate?: SortOrder
    id?: SortOrder
    animal?: AnimalOrderByWithRelationInput
  }

  export type VaccineWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: VaccineWhereInput | VaccineWhereInput[]
    OR?: VaccineWhereInput[]
    NOT?: VaccineWhereInput | VaccineWhereInput[]
    name?: StringFilter<"Vaccine"> | string
    description?: StringNullableFilter<"Vaccine"> | string | null
    date?: DateTimeFilter<"Vaccine"> | Date | string
    animalId?: StringFilter<"Vaccine"> | string
    createdAt?: DateTimeFilter<"Vaccine"> | Date | string
    updatedAt?: DateTimeFilter<"Vaccine"> | Date | string
    expiryDate?: DateTimeFilter<"Vaccine"> | Date | string
    animal?: XOR<AnimalScalarRelationFilter, AnimalWhereInput>
  }, "id">

  export type VaccineOrderByWithAggregationInput = {
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    date?: SortOrder
    animalId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    expiryDate?: SortOrder
    id?: SortOrder
    _count?: VaccineCountOrderByAggregateInput
    _max?: VaccineMaxOrderByAggregateInput
    _min?: VaccineMinOrderByAggregateInput
  }

  export type VaccineScalarWhereWithAggregatesInput = {
    AND?: VaccineScalarWhereWithAggregatesInput | VaccineScalarWhereWithAggregatesInput[]
    OR?: VaccineScalarWhereWithAggregatesInput[]
    NOT?: VaccineScalarWhereWithAggregatesInput | VaccineScalarWhereWithAggregatesInput[]
    name?: StringWithAggregatesFilter<"Vaccine"> | string
    description?: StringNullableWithAggregatesFilter<"Vaccine"> | string | null
    date?: DateTimeWithAggregatesFilter<"Vaccine"> | Date | string
    animalId?: StringWithAggregatesFilter<"Vaccine"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Vaccine"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Vaccine"> | Date | string
    expiryDate?: DateTimeWithAggregatesFilter<"Vaccine"> | Date | string
    id?: UuidWithAggregatesFilter<"Vaccine"> | string
  }

  export type DewormingWhereInput = {
    AND?: DewormingWhereInput | DewormingWhereInput[]
    OR?: DewormingWhereInput[]
    NOT?: DewormingWhereInput | DewormingWhereInput[]
    id?: StringFilter<"Deworming"> | string
    name?: StringFilter<"Deworming"> | string
    date?: DateTimeFilter<"Deworming"> | Date | string
    animalId?: StringFilter<"Deworming"> | string
    createdAt?: DateTimeFilter<"Deworming"> | Date | string
    updatedAt?: DateTimeFilter<"Deworming"> | Date | string
    animal?: XOR<AnimalScalarRelationFilter, AnimalWhereInput>
  }

  export type DewormingOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    date?: SortOrder
    animalId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    animal?: AnimalOrderByWithRelationInput
  }

  export type DewormingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DewormingWhereInput | DewormingWhereInput[]
    OR?: DewormingWhereInput[]
    NOT?: DewormingWhereInput | DewormingWhereInput[]
    name?: StringFilter<"Deworming"> | string
    date?: DateTimeFilter<"Deworming"> | Date | string
    animalId?: StringFilter<"Deworming"> | string
    createdAt?: DateTimeFilter<"Deworming"> | Date | string
    updatedAt?: DateTimeFilter<"Deworming"> | Date | string
    animal?: XOR<AnimalScalarRelationFilter, AnimalWhereInput>
  }, "id">

  export type DewormingOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    date?: SortOrder
    animalId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DewormingCountOrderByAggregateInput
    _max?: DewormingMaxOrderByAggregateInput
    _min?: DewormingMinOrderByAggregateInput
  }

  export type DewormingScalarWhereWithAggregatesInput = {
    AND?: DewormingScalarWhereWithAggregatesInput | DewormingScalarWhereWithAggregatesInput[]
    OR?: DewormingScalarWhereWithAggregatesInput[]
    NOT?: DewormingScalarWhereWithAggregatesInput | DewormingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Deworming"> | string
    name?: StringWithAggregatesFilter<"Deworming"> | string
    date?: DateTimeWithAggregatesFilter<"Deworming"> | Date | string
    animalId?: StringWithAggregatesFilter<"Deworming"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Deworming"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Deworming"> | Date | string
  }

  export type AccountWhereInput = {
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AccountOrderByWithRelationInput = {
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrderInput | SortOrder
    access_token?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    token_type?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    id_token?: SortOrderInput | SortOrder
    session_state?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AccountWhereUniqueInput = Prisma.AtLeast<{
    provider_providerAccountId?: AccountProviderProviderAccountIdCompoundUniqueInput
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "provider_providerAccountId">

  export type AccountOrderByWithAggregationInput = {
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrderInput | SortOrder
    access_token?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    token_type?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    id_token?: SortOrderInput | SortOrder
    session_state?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AccountCountOrderByAggregateInput
    _avg?: AccountAvgOrderByAggregateInput
    _max?: AccountMaxOrderByAggregateInput
    _min?: AccountMinOrderByAggregateInput
    _sum?: AccountSumOrderByAggregateInput
  }

  export type AccountScalarWhereWithAggregatesInput = {
    AND?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    OR?: AccountScalarWhereWithAggregatesInput[]
    NOT?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    userId?: StringWithAggregatesFilter<"Account"> | string
    type?: StringWithAggregatesFilter<"Account"> | string
    provider?: StringWithAggregatesFilter<"Account"> | string
    providerAccountId?: StringWithAggregatesFilter<"Account"> | string
    refresh_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    access_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    expires_at?: IntNullableWithAggregatesFilter<"Account"> | number | null
    token_type?: StringNullableWithAggregatesFilter<"Account"> | string | null
    scope?: StringNullableWithAggregatesFilter<"Account"> | string | null
    id_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    session_state?: StringNullableWithAggregatesFilter<"Account"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    sessionToken?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SessionOrderByWithRelationInput = {
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    sessionToken?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "sessionToken">

  export type SessionOrderByWithAggregationInput = {
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    sessionToken?: StringWithAggregatesFilter<"Session"> | string
    userId?: StringWithAggregatesFilter<"Session"> | string
    expires?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
  }

  export type VerificationTokenWhereInput = {
    AND?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    OR?: VerificationTokenWhereInput[]
    NOT?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    identifier?: StringFilter<"VerificationToken"> | string
    token?: StringFilter<"VerificationToken"> | string
    expires?: DateTimeFilter<"VerificationToken"> | Date | string
  }

  export type VerificationTokenOrderByWithRelationInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenWhereUniqueInput = Prisma.AtLeast<{
    identifier_token?: VerificationTokenIdentifierTokenCompoundUniqueInput
    AND?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    OR?: VerificationTokenWhereInput[]
    NOT?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    identifier?: StringFilter<"VerificationToken"> | string
    token?: StringFilter<"VerificationToken"> | string
    expires?: DateTimeFilter<"VerificationToken"> | Date | string
  }, "identifier_token">

  export type VerificationTokenOrderByWithAggregationInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
    _count?: VerificationTokenCountOrderByAggregateInput
    _max?: VerificationTokenMaxOrderByAggregateInput
    _min?: VerificationTokenMinOrderByAggregateInput
  }

  export type VerificationTokenScalarWhereWithAggregatesInput = {
    AND?: VerificationTokenScalarWhereWithAggregatesInput | VerificationTokenScalarWhereWithAggregatesInput[]
    OR?: VerificationTokenScalarWhereWithAggregatesInput[]
    NOT?: VerificationTokenScalarWhereWithAggregatesInput | VerificationTokenScalarWhereWithAggregatesInput[]
    identifier?: StringWithAggregatesFilter<"VerificationToken"> | string
    token?: StringWithAggregatesFilter<"VerificationToken"> | string
    expires?: DateTimeWithAggregatesFilter<"VerificationToken"> | Date | string
  }

  export type AuthenticatorWhereInput = {
    AND?: AuthenticatorWhereInput | AuthenticatorWhereInput[]
    OR?: AuthenticatorWhereInput[]
    NOT?: AuthenticatorWhereInput | AuthenticatorWhereInput[]
    credentialID?: StringFilter<"Authenticator"> | string
    userId?: StringFilter<"Authenticator"> | string
    providerAccountId?: StringFilter<"Authenticator"> | string
    credentialPublicKey?: StringFilter<"Authenticator"> | string
    counter?: IntFilter<"Authenticator"> | number
    credentialDeviceType?: StringFilter<"Authenticator"> | string
    credentialBackedUp?: BoolFilter<"Authenticator"> | boolean
    transports?: StringNullableFilter<"Authenticator"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AuthenticatorOrderByWithRelationInput = {
    credentialID?: SortOrder
    userId?: SortOrder
    providerAccountId?: SortOrder
    credentialPublicKey?: SortOrder
    counter?: SortOrder
    credentialDeviceType?: SortOrder
    credentialBackedUp?: SortOrder
    transports?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AuthenticatorWhereUniqueInput = Prisma.AtLeast<{
    credentialID?: string
    userId_credentialID?: AuthenticatorUserIdCredentialIDCompoundUniqueInput
    AND?: AuthenticatorWhereInput | AuthenticatorWhereInput[]
    OR?: AuthenticatorWhereInput[]
    NOT?: AuthenticatorWhereInput | AuthenticatorWhereInput[]
    userId?: StringFilter<"Authenticator"> | string
    providerAccountId?: StringFilter<"Authenticator"> | string
    credentialPublicKey?: StringFilter<"Authenticator"> | string
    counter?: IntFilter<"Authenticator"> | number
    credentialDeviceType?: StringFilter<"Authenticator"> | string
    credentialBackedUp?: BoolFilter<"Authenticator"> | boolean
    transports?: StringNullableFilter<"Authenticator"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "userId_credentialID" | "credentialID">

  export type AuthenticatorOrderByWithAggregationInput = {
    credentialID?: SortOrder
    userId?: SortOrder
    providerAccountId?: SortOrder
    credentialPublicKey?: SortOrder
    counter?: SortOrder
    credentialDeviceType?: SortOrder
    credentialBackedUp?: SortOrder
    transports?: SortOrderInput | SortOrder
    _count?: AuthenticatorCountOrderByAggregateInput
    _avg?: AuthenticatorAvgOrderByAggregateInput
    _max?: AuthenticatorMaxOrderByAggregateInput
    _min?: AuthenticatorMinOrderByAggregateInput
    _sum?: AuthenticatorSumOrderByAggregateInput
  }

  export type AuthenticatorScalarWhereWithAggregatesInput = {
    AND?: AuthenticatorScalarWhereWithAggregatesInput | AuthenticatorScalarWhereWithAggregatesInput[]
    OR?: AuthenticatorScalarWhereWithAggregatesInput[]
    NOT?: AuthenticatorScalarWhereWithAggregatesInput | AuthenticatorScalarWhereWithAggregatesInput[]
    credentialID?: StringWithAggregatesFilter<"Authenticator"> | string
    userId?: StringWithAggregatesFilter<"Authenticator"> | string
    providerAccountId?: StringWithAggregatesFilter<"Authenticator"> | string
    credentialPublicKey?: StringWithAggregatesFilter<"Authenticator"> | string
    counter?: IntWithAggregatesFilter<"Authenticator"> | number
    credentialDeviceType?: StringWithAggregatesFilter<"Authenticator"> | string
    credentialBackedUp?: BoolWithAggregatesFilter<"Authenticator"> | boolean
    transports?: StringNullableWithAggregatesFilter<"Authenticator"> | string | null
  }

  export type NotificationWhereInput = {
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    id?: UuidFilter<"Notification"> | string
    message?: StringFilter<"Notification"> | string
    notifyAt?: DateTimeFilter<"Notification"> | Date | string
    read?: BoolFilter<"Notification"> | boolean
    userId?: StringFilter<"Notification"> | string
    animalId?: StringFilter<"Notification"> | string
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    Animal?: XOR<AnimalScalarRelationFilter, AnimalWhereInput>
    User?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type NotificationOrderByWithRelationInput = {
    id?: SortOrder
    message?: SortOrder
    notifyAt?: SortOrder
    read?: SortOrder
    userId?: SortOrder
    animalId?: SortOrder
    createdAt?: SortOrder
    Animal?: AnimalOrderByWithRelationInput
    User?: UserOrderByWithRelationInput
  }

  export type NotificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    message?: StringFilter<"Notification"> | string
    notifyAt?: DateTimeFilter<"Notification"> | Date | string
    read?: BoolFilter<"Notification"> | boolean
    userId?: StringFilter<"Notification"> | string
    animalId?: StringFilter<"Notification"> | string
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    Animal?: XOR<AnimalScalarRelationFilter, AnimalWhereInput>
    User?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type NotificationOrderByWithAggregationInput = {
    id?: SortOrder
    message?: SortOrder
    notifyAt?: SortOrder
    read?: SortOrder
    userId?: SortOrder
    animalId?: SortOrder
    createdAt?: SortOrder
    _count?: NotificationCountOrderByAggregateInput
    _max?: NotificationMaxOrderByAggregateInput
    _min?: NotificationMinOrderByAggregateInput
  }

  export type NotificationScalarWhereWithAggregatesInput = {
    AND?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    OR?: NotificationScalarWhereWithAggregatesInput[]
    NOT?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Notification"> | string
    message?: StringWithAggregatesFilter<"Notification"> | string
    notifyAt?: DateTimeWithAggregatesFilter<"Notification"> | Date | string
    read?: BoolWithAggregatesFilter<"Notification"> | boolean
    userId?: StringWithAggregatesFilter<"Notification"> | string
    animalId?: StringWithAggregatesFilter<"Notification"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Notification"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    name: string
    email: string
    cnpj?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    emailVerified?: Date | string | null
    image?: string | null
    accounts?: AccountCreateNestedManyWithoutUserInput
    animals?: AnimalCreateNestedManyWithoutOwnerInput
    Authenticator?: AuthenticatorCreateNestedManyWithoutUserInput
    Notification?: NotificationCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    cnpj?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    emailVerified?: Date | string | null
    image?: string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    animals?: AnimalUncheckedCreateNestedManyWithoutOwnerInput
    Authenticator?: AuthenticatorUncheckedCreateNestedManyWithoutUserInput
    Notification?: NotificationUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUpdateManyWithoutUserNestedInput
    animals?: AnimalUpdateManyWithoutOwnerNestedInput
    Authenticator?: AuthenticatorUpdateManyWithoutUserNestedInput
    Notification?: NotificationUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    animals?: AnimalUncheckedUpdateManyWithoutOwnerNestedInput
    Authenticator?: AuthenticatorUncheckedUpdateManyWithoutUserNestedInput
    Notification?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name: string
    email: string
    cnpj?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    emailVerified?: Date | string | null
    image?: string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AnimalCreateInput = {
    id?: string
    manualId: string
    gender: string
    birthDate: Date | string
    weight: number
    breed: string
    category?: string
    reproductiveStatus?: string | null
    handlingType?: string | null
    protocol?: string | null
    andrological?: string | null
    expectedDueDate?: Date | string | null
    fetalGender?: string | null
    bullIatf?: string | null
    bodyConditionScore?: number | null
    observations?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    dewormingDate?: Date | string | null
    dewormingExpiry?: Date | string | null
    dewormingName?: string | null
    status?: string
    vaccineDate?: Date | string | null
    vaccineExpiry?: Date | string | null
    vaccineName?: string | null
    bull?: AnimalCreateNestedOneWithoutOffspringFromBullInput
    offspringFromBull?: AnimalCreateNestedManyWithoutBullInput
    father?: AnimalCreateNestedOneWithoutOffspringFromFatherInput
    offspringFromFather?: AnimalCreateNestedManyWithoutFatherInput
    mother?: AnimalCreateNestedOneWithoutOffspringFromMotherInput
    offspringFromMother?: AnimalCreateNestedManyWithoutMotherInput
    owner: UserCreateNestedOneWithoutAnimalsInput
    dewormings?: DewormingCreateNestedManyWithoutAnimalInput
    diseases?: DiseaseCreateNestedManyWithoutAnimalInput
    Notification?: NotificationCreateNestedManyWithoutAnimalInput
    vaccines?: VaccineCreateNestedManyWithoutAnimalInput
  }

  export type AnimalUncheckedCreateInput = {
    id?: string
    manualId: string
    gender: string
    birthDate: Date | string
    weight: number
    breed: string
    category?: string
    motherId?: string | null
    fatherId?: string | null
    reproductiveStatus?: string | null
    handlingType?: string | null
    bullId?: string | null
    protocol?: string | null
    andrological?: string | null
    expectedDueDate?: Date | string | null
    fetalGender?: string | null
    bullIatf?: string | null
    bodyConditionScore?: number | null
    observations?: string | null
    ownerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    dewormingDate?: Date | string | null
    dewormingExpiry?: Date | string | null
    dewormingName?: string | null
    status?: string
    vaccineDate?: Date | string | null
    vaccineExpiry?: Date | string | null
    vaccineName?: string | null
    offspringFromBull?: AnimalUncheckedCreateNestedManyWithoutBullInput
    offspringFromFather?: AnimalUncheckedCreateNestedManyWithoutFatherInput
    offspringFromMother?: AnimalUncheckedCreateNestedManyWithoutMotherInput
    dewormings?: DewormingUncheckedCreateNestedManyWithoutAnimalInput
    diseases?: DiseaseUncheckedCreateNestedManyWithoutAnimalInput
    Notification?: NotificationUncheckedCreateNestedManyWithoutAnimalInput
    vaccines?: VaccineUncheckedCreateNestedManyWithoutAnimalInput
  }

  export type AnimalUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    manualId?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    weight?: FloatFieldUpdateOperationsInput | number
    breed?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    reproductiveStatus?: NullableStringFieldUpdateOperationsInput | string | null
    handlingType?: NullableStringFieldUpdateOperationsInput | string | null
    protocol?: NullableStringFieldUpdateOperationsInput | string | null
    andrological?: NullableStringFieldUpdateOperationsInput | string | null
    expectedDueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fetalGender?: NullableStringFieldUpdateOperationsInput | string | null
    bullIatf?: NullableStringFieldUpdateOperationsInput | string | null
    bodyConditionScore?: NullableFloatFieldUpdateOperationsInput | number | null
    observations?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dewormingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dewormingExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dewormingName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    vaccineDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vaccineExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vaccineName?: NullableStringFieldUpdateOperationsInput | string | null
    bull?: AnimalUpdateOneWithoutOffspringFromBullNestedInput
    offspringFromBull?: AnimalUpdateManyWithoutBullNestedInput
    father?: AnimalUpdateOneWithoutOffspringFromFatherNestedInput
    offspringFromFather?: AnimalUpdateManyWithoutFatherNestedInput
    mother?: AnimalUpdateOneWithoutOffspringFromMotherNestedInput
    offspringFromMother?: AnimalUpdateManyWithoutMotherNestedInput
    owner?: UserUpdateOneRequiredWithoutAnimalsNestedInput
    dewormings?: DewormingUpdateManyWithoutAnimalNestedInput
    diseases?: DiseaseUpdateManyWithoutAnimalNestedInput
    Notification?: NotificationUpdateManyWithoutAnimalNestedInput
    vaccines?: VaccineUpdateManyWithoutAnimalNestedInput
  }

  export type AnimalUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    manualId?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    weight?: FloatFieldUpdateOperationsInput | number
    breed?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    motherId?: NullableStringFieldUpdateOperationsInput | string | null
    fatherId?: NullableStringFieldUpdateOperationsInput | string | null
    reproductiveStatus?: NullableStringFieldUpdateOperationsInput | string | null
    handlingType?: NullableStringFieldUpdateOperationsInput | string | null
    bullId?: NullableStringFieldUpdateOperationsInput | string | null
    protocol?: NullableStringFieldUpdateOperationsInput | string | null
    andrological?: NullableStringFieldUpdateOperationsInput | string | null
    expectedDueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fetalGender?: NullableStringFieldUpdateOperationsInput | string | null
    bullIatf?: NullableStringFieldUpdateOperationsInput | string | null
    bodyConditionScore?: NullableFloatFieldUpdateOperationsInput | number | null
    observations?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dewormingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dewormingExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dewormingName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    vaccineDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vaccineExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vaccineName?: NullableStringFieldUpdateOperationsInput | string | null
    offspringFromBull?: AnimalUncheckedUpdateManyWithoutBullNestedInput
    offspringFromFather?: AnimalUncheckedUpdateManyWithoutFatherNestedInput
    offspringFromMother?: AnimalUncheckedUpdateManyWithoutMotherNestedInput
    dewormings?: DewormingUncheckedUpdateManyWithoutAnimalNestedInput
    diseases?: DiseaseUncheckedUpdateManyWithoutAnimalNestedInput
    Notification?: NotificationUncheckedUpdateManyWithoutAnimalNestedInput
    vaccines?: VaccineUncheckedUpdateManyWithoutAnimalNestedInput
  }

  export type AnimalCreateManyInput = {
    id?: string
    manualId: string
    gender: string
    birthDate: Date | string
    weight: number
    breed: string
    category?: string
    motherId?: string | null
    fatherId?: string | null
    reproductiveStatus?: string | null
    handlingType?: string | null
    bullId?: string | null
    protocol?: string | null
    andrological?: string | null
    expectedDueDate?: Date | string | null
    fetalGender?: string | null
    bullIatf?: string | null
    bodyConditionScore?: number | null
    observations?: string | null
    ownerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    dewormingDate?: Date | string | null
    dewormingExpiry?: Date | string | null
    dewormingName?: string | null
    status?: string
    vaccineDate?: Date | string | null
    vaccineExpiry?: Date | string | null
    vaccineName?: string | null
  }

  export type AnimalUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    manualId?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    weight?: FloatFieldUpdateOperationsInput | number
    breed?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    reproductiveStatus?: NullableStringFieldUpdateOperationsInput | string | null
    handlingType?: NullableStringFieldUpdateOperationsInput | string | null
    protocol?: NullableStringFieldUpdateOperationsInput | string | null
    andrological?: NullableStringFieldUpdateOperationsInput | string | null
    expectedDueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fetalGender?: NullableStringFieldUpdateOperationsInput | string | null
    bullIatf?: NullableStringFieldUpdateOperationsInput | string | null
    bodyConditionScore?: NullableFloatFieldUpdateOperationsInput | number | null
    observations?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dewormingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dewormingExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dewormingName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    vaccineDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vaccineExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vaccineName?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AnimalUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    manualId?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    weight?: FloatFieldUpdateOperationsInput | number
    breed?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    motherId?: NullableStringFieldUpdateOperationsInput | string | null
    fatherId?: NullableStringFieldUpdateOperationsInput | string | null
    reproductiveStatus?: NullableStringFieldUpdateOperationsInput | string | null
    handlingType?: NullableStringFieldUpdateOperationsInput | string | null
    bullId?: NullableStringFieldUpdateOperationsInput | string | null
    protocol?: NullableStringFieldUpdateOperationsInput | string | null
    andrological?: NullableStringFieldUpdateOperationsInput | string | null
    expectedDueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fetalGender?: NullableStringFieldUpdateOperationsInput | string | null
    bullIatf?: NullableStringFieldUpdateOperationsInput | string | null
    bodyConditionScore?: NullableFloatFieldUpdateOperationsInput | number | null
    observations?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dewormingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dewormingExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dewormingName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    vaccineDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vaccineExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vaccineName?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DiseaseCreateInput = {
    id?: string
    name: string
    description?: string | null
    date: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    animal: AnimalCreateNestedOneWithoutDiseasesInput
  }

  export type DiseaseUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    date: Date | string
    animalId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DiseaseUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    animal?: AnimalUpdateOneRequiredWithoutDiseasesNestedInput
  }

  export type DiseaseUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    animalId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DiseaseCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    date: Date | string
    animalId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DiseaseUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DiseaseUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    animalId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VaccineCreateInput = {
    name: string
    description?: string | null
    date: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    expiryDate: Date | string
    id?: string
    animal: AnimalCreateNestedOneWithoutVaccinesInput
  }

  export type VaccineUncheckedCreateInput = {
    name: string
    description?: string | null
    date: Date | string
    animalId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    expiryDate: Date | string
    id?: string
  }

  export type VaccineUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiryDate?: DateTimeFieldUpdateOperationsInput | Date | string
    id?: StringFieldUpdateOperationsInput | string
    animal?: AnimalUpdateOneRequiredWithoutVaccinesNestedInput
  }

  export type VaccineUncheckedUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    animalId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiryDate?: DateTimeFieldUpdateOperationsInput | Date | string
    id?: StringFieldUpdateOperationsInput | string
  }

  export type VaccineCreateManyInput = {
    name: string
    description?: string | null
    date: Date | string
    animalId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    expiryDate: Date | string
    id?: string
  }

  export type VaccineUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiryDate?: DateTimeFieldUpdateOperationsInput | Date | string
    id?: StringFieldUpdateOperationsInput | string
  }

  export type VaccineUncheckedUpdateManyInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    animalId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiryDate?: DateTimeFieldUpdateOperationsInput | Date | string
    id?: StringFieldUpdateOperationsInput | string
  }

  export type DewormingCreateInput = {
    id?: string
    name: string
    date: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    animal: AnimalCreateNestedOneWithoutDewormingsInput
  }

  export type DewormingUncheckedCreateInput = {
    id?: string
    name: string
    date: Date | string
    animalId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DewormingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    animal?: AnimalUpdateOneRequiredWithoutDewormingsNestedInput
  }

  export type DewormingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    animalId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DewormingCreateManyInput = {
    id?: string
    name: string
    date: Date | string
    animalId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DewormingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DewormingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    animalId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountCreateInput = {
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutAccountsInput
  }

  export type AccountUncheckedCreateInput = {
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUpdateInput = {
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAccountsNestedInput
  }

  export type AccountUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountCreateManyInput = {
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUpdateManyMutationInput = {
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateInput = {
    sessionToken: string
    expires: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateInput = {
    sessionToken: string
    userId: string
    expires: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SessionUpdateInput = {
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    sessionToken?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateManyInput = {
    sessionToken: string
    userId: string
    expires: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SessionUpdateManyMutationInput = {
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyInput = {
    sessionToken?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenCreateInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUncheckedCreateInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUpdateInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenUncheckedUpdateInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenCreateManyInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUpdateManyMutationInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenUncheckedUpdateManyInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuthenticatorCreateInput = {
    credentialID: string
    providerAccountId: string
    credentialPublicKey: string
    counter: number
    credentialDeviceType: string
    credentialBackedUp: boolean
    transports?: string | null
    user: UserCreateNestedOneWithoutAuthenticatorInput
  }

  export type AuthenticatorUncheckedCreateInput = {
    credentialID: string
    userId: string
    providerAccountId: string
    credentialPublicKey: string
    counter: number
    credentialDeviceType: string
    credentialBackedUp: boolean
    transports?: string | null
  }

  export type AuthenticatorUpdateInput = {
    credentialID?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    credentialPublicKey?: StringFieldUpdateOperationsInput | string
    counter?: IntFieldUpdateOperationsInput | number
    credentialDeviceType?: StringFieldUpdateOperationsInput | string
    credentialBackedUp?: BoolFieldUpdateOperationsInput | boolean
    transports?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutAuthenticatorNestedInput
  }

  export type AuthenticatorUncheckedUpdateInput = {
    credentialID?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    credentialPublicKey?: StringFieldUpdateOperationsInput | string
    counter?: IntFieldUpdateOperationsInput | number
    credentialDeviceType?: StringFieldUpdateOperationsInput | string
    credentialBackedUp?: BoolFieldUpdateOperationsInput | boolean
    transports?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AuthenticatorCreateManyInput = {
    credentialID: string
    userId: string
    providerAccountId: string
    credentialPublicKey: string
    counter: number
    credentialDeviceType: string
    credentialBackedUp: boolean
    transports?: string | null
  }

  export type AuthenticatorUpdateManyMutationInput = {
    credentialID?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    credentialPublicKey?: StringFieldUpdateOperationsInput | string
    counter?: IntFieldUpdateOperationsInput | number
    credentialDeviceType?: StringFieldUpdateOperationsInput | string
    credentialBackedUp?: BoolFieldUpdateOperationsInput | boolean
    transports?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AuthenticatorUncheckedUpdateManyInput = {
    credentialID?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    credentialPublicKey?: StringFieldUpdateOperationsInput | string
    counter?: IntFieldUpdateOperationsInput | number
    credentialDeviceType?: StringFieldUpdateOperationsInput | string
    credentialBackedUp?: BoolFieldUpdateOperationsInput | boolean
    transports?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type NotificationCreateInput = {
    id?: string
    message: string
    notifyAt: Date | string
    read?: boolean
    createdAt?: Date | string
    Animal: AnimalCreateNestedOneWithoutNotificationInput
    User: UserCreateNestedOneWithoutNotificationInput
  }

  export type NotificationUncheckedCreateInput = {
    id?: string
    message: string
    notifyAt: Date | string
    read?: boolean
    userId: string
    animalId: string
    createdAt?: Date | string
  }

  export type NotificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    notifyAt?: DateTimeFieldUpdateOperationsInput | Date | string
    read?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Animal?: AnimalUpdateOneRequiredWithoutNotificationNestedInput
    User?: UserUpdateOneRequiredWithoutNotificationNestedInput
  }

  export type NotificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    notifyAt?: DateTimeFieldUpdateOperationsInput | Date | string
    read?: BoolFieldUpdateOperationsInput | boolean
    userId?: StringFieldUpdateOperationsInput | string
    animalId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateManyInput = {
    id?: string
    message: string
    notifyAt: Date | string
    read?: boolean
    userId: string
    animalId: string
    createdAt?: Date | string
  }

  export type NotificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    notifyAt?: DateTimeFieldUpdateOperationsInput | Date | string
    read?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    notifyAt?: DateTimeFieldUpdateOperationsInput | Date | string
    read?: BoolFieldUpdateOperationsInput | boolean
    userId?: StringFieldUpdateOperationsInput | string
    animalId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type AccountListRelationFilter = {
    every?: AccountWhereInput
    some?: AccountWhereInput
    none?: AccountWhereInput
  }

  export type AnimalListRelationFilter = {
    every?: AnimalWhereInput
    some?: AnimalWhereInput
    none?: AnimalWhereInput
  }

  export type AuthenticatorListRelationFilter = {
    every?: AuthenticatorWhereInput
    some?: AuthenticatorWhereInput
    none?: AuthenticatorWhereInput
  }

  export type NotificationListRelationFilter = {
    every?: NotificationWhereInput
    some?: NotificationWhereInput
    none?: NotificationWhereInput
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AnimalOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AuthenticatorOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type NotificationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    cnpj?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    cnpj?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    cnpj?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type AnimalNullableScalarRelationFilter = {
    is?: AnimalWhereInput | null
    isNot?: AnimalWhereInput | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type DewormingListRelationFilter = {
    every?: DewormingWhereInput
    some?: DewormingWhereInput
    none?: DewormingWhereInput
  }

  export type DiseaseListRelationFilter = {
    every?: DiseaseWhereInput
    some?: DiseaseWhereInput
    none?: DiseaseWhereInput
  }

  export type VaccineListRelationFilter = {
    every?: VaccineWhereInput
    some?: VaccineWhereInput
    none?: VaccineWhereInput
  }

  export type DewormingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DiseaseOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type VaccineOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AnimalManualIdOwnerIdCompoundUniqueInput = {
    manualId: string
    ownerId: string
  }

  export type AnimalCountOrderByAggregateInput = {
    id?: SortOrder
    manualId?: SortOrder
    gender?: SortOrder
    birthDate?: SortOrder
    weight?: SortOrder
    breed?: SortOrder
    category?: SortOrder
    motherId?: SortOrder
    fatherId?: SortOrder
    reproductiveStatus?: SortOrder
    handlingType?: SortOrder
    bullId?: SortOrder
    protocol?: SortOrder
    andrological?: SortOrder
    expectedDueDate?: SortOrder
    fetalGender?: SortOrder
    bullIatf?: SortOrder
    bodyConditionScore?: SortOrder
    observations?: SortOrder
    ownerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    dewormingDate?: SortOrder
    dewormingExpiry?: SortOrder
    dewormingName?: SortOrder
    status?: SortOrder
    vaccineDate?: SortOrder
    vaccineExpiry?: SortOrder
    vaccineName?: SortOrder
  }

  export type AnimalAvgOrderByAggregateInput = {
    weight?: SortOrder
    bodyConditionScore?: SortOrder
  }

  export type AnimalMaxOrderByAggregateInput = {
    id?: SortOrder
    manualId?: SortOrder
    gender?: SortOrder
    birthDate?: SortOrder
    weight?: SortOrder
    breed?: SortOrder
    category?: SortOrder
    motherId?: SortOrder
    fatherId?: SortOrder
    reproductiveStatus?: SortOrder
    handlingType?: SortOrder
    bullId?: SortOrder
    protocol?: SortOrder
    andrological?: SortOrder
    expectedDueDate?: SortOrder
    fetalGender?: SortOrder
    bullIatf?: SortOrder
    bodyConditionScore?: SortOrder
    observations?: SortOrder
    ownerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    dewormingDate?: SortOrder
    dewormingExpiry?: SortOrder
    dewormingName?: SortOrder
    status?: SortOrder
    vaccineDate?: SortOrder
    vaccineExpiry?: SortOrder
    vaccineName?: SortOrder
  }

  export type AnimalMinOrderByAggregateInput = {
    id?: SortOrder
    manualId?: SortOrder
    gender?: SortOrder
    birthDate?: SortOrder
    weight?: SortOrder
    breed?: SortOrder
    category?: SortOrder
    motherId?: SortOrder
    fatherId?: SortOrder
    reproductiveStatus?: SortOrder
    handlingType?: SortOrder
    bullId?: SortOrder
    protocol?: SortOrder
    andrological?: SortOrder
    expectedDueDate?: SortOrder
    fetalGender?: SortOrder
    bullIatf?: SortOrder
    bodyConditionScore?: SortOrder
    observations?: SortOrder
    ownerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    dewormingDate?: SortOrder
    dewormingExpiry?: SortOrder
    dewormingName?: SortOrder
    status?: SortOrder
    vaccineDate?: SortOrder
    vaccineExpiry?: SortOrder
    vaccineName?: SortOrder
  }

  export type AnimalSumOrderByAggregateInput = {
    weight?: SortOrder
    bodyConditionScore?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type AnimalScalarRelationFilter = {
    is?: AnimalWhereInput
    isNot?: AnimalWhereInput
  }

  export type DiseaseCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    date?: SortOrder
    animalId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DiseaseMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    date?: SortOrder
    animalId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DiseaseMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    date?: SortOrder
    animalId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type VaccineCountOrderByAggregateInput = {
    name?: SortOrder
    description?: SortOrder
    date?: SortOrder
    animalId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    expiryDate?: SortOrder
    id?: SortOrder
  }

  export type VaccineMaxOrderByAggregateInput = {
    name?: SortOrder
    description?: SortOrder
    date?: SortOrder
    animalId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    expiryDate?: SortOrder
    id?: SortOrder
  }

  export type VaccineMinOrderByAggregateInput = {
    name?: SortOrder
    description?: SortOrder
    date?: SortOrder
    animalId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    expiryDate?: SortOrder
    id?: SortOrder
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DewormingCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    date?: SortOrder
    animalId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DewormingMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    date?: SortOrder
    animalId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DewormingMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    date?: SortOrder
    animalId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type AccountProviderProviderAccountIdCompoundUniqueInput = {
    provider: string
    providerAccountId: string
  }

  export type AccountCountOrderByAggregateInput = {
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountAvgOrderByAggregateInput = {
    expires_at?: SortOrder
  }

  export type AccountMaxOrderByAggregateInput = {
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountMinOrderByAggregateInput = {
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountSumOrderByAggregateInput = {
    expires_at?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type SessionCountOrderByAggregateInput = {
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VerificationTokenIdentifierTokenCompoundUniqueInput = {
    identifier: string
    token: string
  }

  export type VerificationTokenCountOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenMaxOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenMinOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type AuthenticatorUserIdCredentialIDCompoundUniqueInput = {
    userId: string
    credentialID: string
  }

  export type AuthenticatorCountOrderByAggregateInput = {
    credentialID?: SortOrder
    userId?: SortOrder
    providerAccountId?: SortOrder
    credentialPublicKey?: SortOrder
    counter?: SortOrder
    credentialDeviceType?: SortOrder
    credentialBackedUp?: SortOrder
    transports?: SortOrder
  }

  export type AuthenticatorAvgOrderByAggregateInput = {
    counter?: SortOrder
  }

  export type AuthenticatorMaxOrderByAggregateInput = {
    credentialID?: SortOrder
    userId?: SortOrder
    providerAccountId?: SortOrder
    credentialPublicKey?: SortOrder
    counter?: SortOrder
    credentialDeviceType?: SortOrder
    credentialBackedUp?: SortOrder
    transports?: SortOrder
  }

  export type AuthenticatorMinOrderByAggregateInput = {
    credentialID?: SortOrder
    userId?: SortOrder
    providerAccountId?: SortOrder
    credentialPublicKey?: SortOrder
    counter?: SortOrder
    credentialDeviceType?: SortOrder
    credentialBackedUp?: SortOrder
    transports?: SortOrder
  }

  export type AuthenticatorSumOrderByAggregateInput = {
    counter?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NotificationCountOrderByAggregateInput = {
    id?: SortOrder
    message?: SortOrder
    notifyAt?: SortOrder
    read?: SortOrder
    userId?: SortOrder
    animalId?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationMaxOrderByAggregateInput = {
    id?: SortOrder
    message?: SortOrder
    notifyAt?: SortOrder
    read?: SortOrder
    userId?: SortOrder
    animalId?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationMinOrderByAggregateInput = {
    id?: SortOrder
    message?: SortOrder
    notifyAt?: SortOrder
    read?: SortOrder
    userId?: SortOrder
    animalId?: SortOrder
    createdAt?: SortOrder
  }

  export type AccountCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type AnimalCreateNestedManyWithoutOwnerInput = {
    create?: XOR<AnimalCreateWithoutOwnerInput, AnimalUncheckedCreateWithoutOwnerInput> | AnimalCreateWithoutOwnerInput[] | AnimalUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: AnimalCreateOrConnectWithoutOwnerInput | AnimalCreateOrConnectWithoutOwnerInput[]
    createMany?: AnimalCreateManyOwnerInputEnvelope
    connect?: AnimalWhereUniqueInput | AnimalWhereUniqueInput[]
  }

  export type AuthenticatorCreateNestedManyWithoutUserInput = {
    create?: XOR<AuthenticatorCreateWithoutUserInput, AuthenticatorUncheckedCreateWithoutUserInput> | AuthenticatorCreateWithoutUserInput[] | AuthenticatorUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuthenticatorCreateOrConnectWithoutUserInput | AuthenticatorCreateOrConnectWithoutUserInput[]
    createMany?: AuthenticatorCreateManyUserInputEnvelope
    connect?: AuthenticatorWhereUniqueInput | AuthenticatorWhereUniqueInput[]
  }

  export type NotificationCreateNestedManyWithoutUserInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type SessionCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type AccountUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type AnimalUncheckedCreateNestedManyWithoutOwnerInput = {
    create?: XOR<AnimalCreateWithoutOwnerInput, AnimalUncheckedCreateWithoutOwnerInput> | AnimalCreateWithoutOwnerInput[] | AnimalUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: AnimalCreateOrConnectWithoutOwnerInput | AnimalCreateOrConnectWithoutOwnerInput[]
    createMany?: AnimalCreateManyOwnerInputEnvelope
    connect?: AnimalWhereUniqueInput | AnimalWhereUniqueInput[]
  }

  export type AuthenticatorUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AuthenticatorCreateWithoutUserInput, AuthenticatorUncheckedCreateWithoutUserInput> | AuthenticatorCreateWithoutUserInput[] | AuthenticatorUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuthenticatorCreateOrConnectWithoutUserInput | AuthenticatorCreateOrConnectWithoutUserInput[]
    createMany?: AuthenticatorCreateManyUserInputEnvelope
    connect?: AuthenticatorWhereUniqueInput | AuthenticatorWhereUniqueInput[]
  }

  export type NotificationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type AccountUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type AnimalUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<AnimalCreateWithoutOwnerInput, AnimalUncheckedCreateWithoutOwnerInput> | AnimalCreateWithoutOwnerInput[] | AnimalUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: AnimalCreateOrConnectWithoutOwnerInput | AnimalCreateOrConnectWithoutOwnerInput[]
    upsert?: AnimalUpsertWithWhereUniqueWithoutOwnerInput | AnimalUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: AnimalCreateManyOwnerInputEnvelope
    set?: AnimalWhereUniqueInput | AnimalWhereUniqueInput[]
    disconnect?: AnimalWhereUniqueInput | AnimalWhereUniqueInput[]
    delete?: AnimalWhereUniqueInput | AnimalWhereUniqueInput[]
    connect?: AnimalWhereUniqueInput | AnimalWhereUniqueInput[]
    update?: AnimalUpdateWithWhereUniqueWithoutOwnerInput | AnimalUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: AnimalUpdateManyWithWhereWithoutOwnerInput | AnimalUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: AnimalScalarWhereInput | AnimalScalarWhereInput[]
  }

  export type AuthenticatorUpdateManyWithoutUserNestedInput = {
    create?: XOR<AuthenticatorCreateWithoutUserInput, AuthenticatorUncheckedCreateWithoutUserInput> | AuthenticatorCreateWithoutUserInput[] | AuthenticatorUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuthenticatorCreateOrConnectWithoutUserInput | AuthenticatorCreateOrConnectWithoutUserInput[]
    upsert?: AuthenticatorUpsertWithWhereUniqueWithoutUserInput | AuthenticatorUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AuthenticatorCreateManyUserInputEnvelope
    set?: AuthenticatorWhereUniqueInput | AuthenticatorWhereUniqueInput[]
    disconnect?: AuthenticatorWhereUniqueInput | AuthenticatorWhereUniqueInput[]
    delete?: AuthenticatorWhereUniqueInput | AuthenticatorWhereUniqueInput[]
    connect?: AuthenticatorWhereUniqueInput | AuthenticatorWhereUniqueInput[]
    update?: AuthenticatorUpdateWithWhereUniqueWithoutUserInput | AuthenticatorUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AuthenticatorUpdateManyWithWhereWithoutUserInput | AuthenticatorUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AuthenticatorScalarWhereInput | AuthenticatorScalarWhereInput[]
  }

  export type NotificationUpdateManyWithoutUserNestedInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutUserInput | NotificationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutUserInput | NotificationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutUserInput | NotificationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type AccountUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type AnimalUncheckedUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<AnimalCreateWithoutOwnerInput, AnimalUncheckedCreateWithoutOwnerInput> | AnimalCreateWithoutOwnerInput[] | AnimalUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: AnimalCreateOrConnectWithoutOwnerInput | AnimalCreateOrConnectWithoutOwnerInput[]
    upsert?: AnimalUpsertWithWhereUniqueWithoutOwnerInput | AnimalUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: AnimalCreateManyOwnerInputEnvelope
    set?: AnimalWhereUniqueInput | AnimalWhereUniqueInput[]
    disconnect?: AnimalWhereUniqueInput | AnimalWhereUniqueInput[]
    delete?: AnimalWhereUniqueInput | AnimalWhereUniqueInput[]
    connect?: AnimalWhereUniqueInput | AnimalWhereUniqueInput[]
    update?: AnimalUpdateWithWhereUniqueWithoutOwnerInput | AnimalUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: AnimalUpdateManyWithWhereWithoutOwnerInput | AnimalUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: AnimalScalarWhereInput | AnimalScalarWhereInput[]
  }

  export type AuthenticatorUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AuthenticatorCreateWithoutUserInput, AuthenticatorUncheckedCreateWithoutUserInput> | AuthenticatorCreateWithoutUserInput[] | AuthenticatorUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuthenticatorCreateOrConnectWithoutUserInput | AuthenticatorCreateOrConnectWithoutUserInput[]
    upsert?: AuthenticatorUpsertWithWhereUniqueWithoutUserInput | AuthenticatorUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AuthenticatorCreateManyUserInputEnvelope
    set?: AuthenticatorWhereUniqueInput | AuthenticatorWhereUniqueInput[]
    disconnect?: AuthenticatorWhereUniqueInput | AuthenticatorWhereUniqueInput[]
    delete?: AuthenticatorWhereUniqueInput | AuthenticatorWhereUniqueInput[]
    connect?: AuthenticatorWhereUniqueInput | AuthenticatorWhereUniqueInput[]
    update?: AuthenticatorUpdateWithWhereUniqueWithoutUserInput | AuthenticatorUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AuthenticatorUpdateManyWithWhereWithoutUserInput | AuthenticatorUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AuthenticatorScalarWhereInput | AuthenticatorScalarWhereInput[]
  }

  export type NotificationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutUserInput | NotificationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutUserInput | NotificationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutUserInput | NotificationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type AnimalCreateNestedOneWithoutOffspringFromBullInput = {
    create?: XOR<AnimalCreateWithoutOffspringFromBullInput, AnimalUncheckedCreateWithoutOffspringFromBullInput>
    connectOrCreate?: AnimalCreateOrConnectWithoutOffspringFromBullInput
    connect?: AnimalWhereUniqueInput
  }

  export type AnimalCreateNestedManyWithoutBullInput = {
    create?: XOR<AnimalCreateWithoutBullInput, AnimalUncheckedCreateWithoutBullInput> | AnimalCreateWithoutBullInput[] | AnimalUncheckedCreateWithoutBullInput[]
    connectOrCreate?: AnimalCreateOrConnectWithoutBullInput | AnimalCreateOrConnectWithoutBullInput[]
    createMany?: AnimalCreateManyBullInputEnvelope
    connect?: AnimalWhereUniqueInput | AnimalWhereUniqueInput[]
  }

  export type AnimalCreateNestedOneWithoutOffspringFromFatherInput = {
    create?: XOR<AnimalCreateWithoutOffspringFromFatherInput, AnimalUncheckedCreateWithoutOffspringFromFatherInput>
    connectOrCreate?: AnimalCreateOrConnectWithoutOffspringFromFatherInput
    connect?: AnimalWhereUniqueInput
  }

  export type AnimalCreateNestedManyWithoutFatherInput = {
    create?: XOR<AnimalCreateWithoutFatherInput, AnimalUncheckedCreateWithoutFatherInput> | AnimalCreateWithoutFatherInput[] | AnimalUncheckedCreateWithoutFatherInput[]
    connectOrCreate?: AnimalCreateOrConnectWithoutFatherInput | AnimalCreateOrConnectWithoutFatherInput[]
    createMany?: AnimalCreateManyFatherInputEnvelope
    connect?: AnimalWhereUniqueInput | AnimalWhereUniqueInput[]
  }

  export type AnimalCreateNestedOneWithoutOffspringFromMotherInput = {
    create?: XOR<AnimalCreateWithoutOffspringFromMotherInput, AnimalUncheckedCreateWithoutOffspringFromMotherInput>
    connectOrCreate?: AnimalCreateOrConnectWithoutOffspringFromMotherInput
    connect?: AnimalWhereUniqueInput
  }

  export type AnimalCreateNestedManyWithoutMotherInput = {
    create?: XOR<AnimalCreateWithoutMotherInput, AnimalUncheckedCreateWithoutMotherInput> | AnimalCreateWithoutMotherInput[] | AnimalUncheckedCreateWithoutMotherInput[]
    connectOrCreate?: AnimalCreateOrConnectWithoutMotherInput | AnimalCreateOrConnectWithoutMotherInput[]
    createMany?: AnimalCreateManyMotherInputEnvelope
    connect?: AnimalWhereUniqueInput | AnimalWhereUniqueInput[]
  }

  export type UserCreateNestedOneWithoutAnimalsInput = {
    create?: XOR<UserCreateWithoutAnimalsInput, UserUncheckedCreateWithoutAnimalsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAnimalsInput
    connect?: UserWhereUniqueInput
  }

  export type DewormingCreateNestedManyWithoutAnimalInput = {
    create?: XOR<DewormingCreateWithoutAnimalInput, DewormingUncheckedCreateWithoutAnimalInput> | DewormingCreateWithoutAnimalInput[] | DewormingUncheckedCreateWithoutAnimalInput[]
    connectOrCreate?: DewormingCreateOrConnectWithoutAnimalInput | DewormingCreateOrConnectWithoutAnimalInput[]
    createMany?: DewormingCreateManyAnimalInputEnvelope
    connect?: DewormingWhereUniqueInput | DewormingWhereUniqueInput[]
  }

  export type DiseaseCreateNestedManyWithoutAnimalInput = {
    create?: XOR<DiseaseCreateWithoutAnimalInput, DiseaseUncheckedCreateWithoutAnimalInput> | DiseaseCreateWithoutAnimalInput[] | DiseaseUncheckedCreateWithoutAnimalInput[]
    connectOrCreate?: DiseaseCreateOrConnectWithoutAnimalInput | DiseaseCreateOrConnectWithoutAnimalInput[]
    createMany?: DiseaseCreateManyAnimalInputEnvelope
    connect?: DiseaseWhereUniqueInput | DiseaseWhereUniqueInput[]
  }

  export type NotificationCreateNestedManyWithoutAnimalInput = {
    create?: XOR<NotificationCreateWithoutAnimalInput, NotificationUncheckedCreateWithoutAnimalInput> | NotificationCreateWithoutAnimalInput[] | NotificationUncheckedCreateWithoutAnimalInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutAnimalInput | NotificationCreateOrConnectWithoutAnimalInput[]
    createMany?: NotificationCreateManyAnimalInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type VaccineCreateNestedManyWithoutAnimalInput = {
    create?: XOR<VaccineCreateWithoutAnimalInput, VaccineUncheckedCreateWithoutAnimalInput> | VaccineCreateWithoutAnimalInput[] | VaccineUncheckedCreateWithoutAnimalInput[]
    connectOrCreate?: VaccineCreateOrConnectWithoutAnimalInput | VaccineCreateOrConnectWithoutAnimalInput[]
    createMany?: VaccineCreateManyAnimalInputEnvelope
    connect?: VaccineWhereUniqueInput | VaccineWhereUniqueInput[]
  }

  export type AnimalUncheckedCreateNestedManyWithoutBullInput = {
    create?: XOR<AnimalCreateWithoutBullInput, AnimalUncheckedCreateWithoutBullInput> | AnimalCreateWithoutBullInput[] | AnimalUncheckedCreateWithoutBullInput[]
    connectOrCreate?: AnimalCreateOrConnectWithoutBullInput | AnimalCreateOrConnectWithoutBullInput[]
    createMany?: AnimalCreateManyBullInputEnvelope
    connect?: AnimalWhereUniqueInput | AnimalWhereUniqueInput[]
  }

  export type AnimalUncheckedCreateNestedManyWithoutFatherInput = {
    create?: XOR<AnimalCreateWithoutFatherInput, AnimalUncheckedCreateWithoutFatherInput> | AnimalCreateWithoutFatherInput[] | AnimalUncheckedCreateWithoutFatherInput[]
    connectOrCreate?: AnimalCreateOrConnectWithoutFatherInput | AnimalCreateOrConnectWithoutFatherInput[]
    createMany?: AnimalCreateManyFatherInputEnvelope
    connect?: AnimalWhereUniqueInput | AnimalWhereUniqueInput[]
  }

  export type AnimalUncheckedCreateNestedManyWithoutMotherInput = {
    create?: XOR<AnimalCreateWithoutMotherInput, AnimalUncheckedCreateWithoutMotherInput> | AnimalCreateWithoutMotherInput[] | AnimalUncheckedCreateWithoutMotherInput[]
    connectOrCreate?: AnimalCreateOrConnectWithoutMotherInput | AnimalCreateOrConnectWithoutMotherInput[]
    createMany?: AnimalCreateManyMotherInputEnvelope
    connect?: AnimalWhereUniqueInput | AnimalWhereUniqueInput[]
  }

  export type DewormingUncheckedCreateNestedManyWithoutAnimalInput = {
    create?: XOR<DewormingCreateWithoutAnimalInput, DewormingUncheckedCreateWithoutAnimalInput> | DewormingCreateWithoutAnimalInput[] | DewormingUncheckedCreateWithoutAnimalInput[]
    connectOrCreate?: DewormingCreateOrConnectWithoutAnimalInput | DewormingCreateOrConnectWithoutAnimalInput[]
    createMany?: DewormingCreateManyAnimalInputEnvelope
    connect?: DewormingWhereUniqueInput | DewormingWhereUniqueInput[]
  }

  export type DiseaseUncheckedCreateNestedManyWithoutAnimalInput = {
    create?: XOR<DiseaseCreateWithoutAnimalInput, DiseaseUncheckedCreateWithoutAnimalInput> | DiseaseCreateWithoutAnimalInput[] | DiseaseUncheckedCreateWithoutAnimalInput[]
    connectOrCreate?: DiseaseCreateOrConnectWithoutAnimalInput | DiseaseCreateOrConnectWithoutAnimalInput[]
    createMany?: DiseaseCreateManyAnimalInputEnvelope
    connect?: DiseaseWhereUniqueInput | DiseaseWhereUniqueInput[]
  }

  export type NotificationUncheckedCreateNestedManyWithoutAnimalInput = {
    create?: XOR<NotificationCreateWithoutAnimalInput, NotificationUncheckedCreateWithoutAnimalInput> | NotificationCreateWithoutAnimalInput[] | NotificationUncheckedCreateWithoutAnimalInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutAnimalInput | NotificationCreateOrConnectWithoutAnimalInput[]
    createMany?: NotificationCreateManyAnimalInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type VaccineUncheckedCreateNestedManyWithoutAnimalInput = {
    create?: XOR<VaccineCreateWithoutAnimalInput, VaccineUncheckedCreateWithoutAnimalInput> | VaccineCreateWithoutAnimalInput[] | VaccineUncheckedCreateWithoutAnimalInput[]
    connectOrCreate?: VaccineCreateOrConnectWithoutAnimalInput | VaccineCreateOrConnectWithoutAnimalInput[]
    createMany?: VaccineCreateManyAnimalInputEnvelope
    connect?: VaccineWhereUniqueInput | VaccineWhereUniqueInput[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type AnimalUpdateOneWithoutOffspringFromBullNestedInput = {
    create?: XOR<AnimalCreateWithoutOffspringFromBullInput, AnimalUncheckedCreateWithoutOffspringFromBullInput>
    connectOrCreate?: AnimalCreateOrConnectWithoutOffspringFromBullInput
    upsert?: AnimalUpsertWithoutOffspringFromBullInput
    disconnect?: AnimalWhereInput | boolean
    delete?: AnimalWhereInput | boolean
    connect?: AnimalWhereUniqueInput
    update?: XOR<XOR<AnimalUpdateToOneWithWhereWithoutOffspringFromBullInput, AnimalUpdateWithoutOffspringFromBullInput>, AnimalUncheckedUpdateWithoutOffspringFromBullInput>
  }

  export type AnimalUpdateManyWithoutBullNestedInput = {
    create?: XOR<AnimalCreateWithoutBullInput, AnimalUncheckedCreateWithoutBullInput> | AnimalCreateWithoutBullInput[] | AnimalUncheckedCreateWithoutBullInput[]
    connectOrCreate?: AnimalCreateOrConnectWithoutBullInput | AnimalCreateOrConnectWithoutBullInput[]
    upsert?: AnimalUpsertWithWhereUniqueWithoutBullInput | AnimalUpsertWithWhereUniqueWithoutBullInput[]
    createMany?: AnimalCreateManyBullInputEnvelope
    set?: AnimalWhereUniqueInput | AnimalWhereUniqueInput[]
    disconnect?: AnimalWhereUniqueInput | AnimalWhereUniqueInput[]
    delete?: AnimalWhereUniqueInput | AnimalWhereUniqueInput[]
    connect?: AnimalWhereUniqueInput | AnimalWhereUniqueInput[]
    update?: AnimalUpdateWithWhereUniqueWithoutBullInput | AnimalUpdateWithWhereUniqueWithoutBullInput[]
    updateMany?: AnimalUpdateManyWithWhereWithoutBullInput | AnimalUpdateManyWithWhereWithoutBullInput[]
    deleteMany?: AnimalScalarWhereInput | AnimalScalarWhereInput[]
  }

  export type AnimalUpdateOneWithoutOffspringFromFatherNestedInput = {
    create?: XOR<AnimalCreateWithoutOffspringFromFatherInput, AnimalUncheckedCreateWithoutOffspringFromFatherInput>
    connectOrCreate?: AnimalCreateOrConnectWithoutOffspringFromFatherInput
    upsert?: AnimalUpsertWithoutOffspringFromFatherInput
    disconnect?: AnimalWhereInput | boolean
    delete?: AnimalWhereInput | boolean
    connect?: AnimalWhereUniqueInput
    update?: XOR<XOR<AnimalUpdateToOneWithWhereWithoutOffspringFromFatherInput, AnimalUpdateWithoutOffspringFromFatherInput>, AnimalUncheckedUpdateWithoutOffspringFromFatherInput>
  }

  export type AnimalUpdateManyWithoutFatherNestedInput = {
    create?: XOR<AnimalCreateWithoutFatherInput, AnimalUncheckedCreateWithoutFatherInput> | AnimalCreateWithoutFatherInput[] | AnimalUncheckedCreateWithoutFatherInput[]
    connectOrCreate?: AnimalCreateOrConnectWithoutFatherInput | AnimalCreateOrConnectWithoutFatherInput[]
    upsert?: AnimalUpsertWithWhereUniqueWithoutFatherInput | AnimalUpsertWithWhereUniqueWithoutFatherInput[]
    createMany?: AnimalCreateManyFatherInputEnvelope
    set?: AnimalWhereUniqueInput | AnimalWhereUniqueInput[]
    disconnect?: AnimalWhereUniqueInput | AnimalWhereUniqueInput[]
    delete?: AnimalWhereUniqueInput | AnimalWhereUniqueInput[]
    connect?: AnimalWhereUniqueInput | AnimalWhereUniqueInput[]
    update?: AnimalUpdateWithWhereUniqueWithoutFatherInput | AnimalUpdateWithWhereUniqueWithoutFatherInput[]
    updateMany?: AnimalUpdateManyWithWhereWithoutFatherInput | AnimalUpdateManyWithWhereWithoutFatherInput[]
    deleteMany?: AnimalScalarWhereInput | AnimalScalarWhereInput[]
  }

  export type AnimalUpdateOneWithoutOffspringFromMotherNestedInput = {
    create?: XOR<AnimalCreateWithoutOffspringFromMotherInput, AnimalUncheckedCreateWithoutOffspringFromMotherInput>
    connectOrCreate?: AnimalCreateOrConnectWithoutOffspringFromMotherInput
    upsert?: AnimalUpsertWithoutOffspringFromMotherInput
    disconnect?: AnimalWhereInput | boolean
    delete?: AnimalWhereInput | boolean
    connect?: AnimalWhereUniqueInput
    update?: XOR<XOR<AnimalUpdateToOneWithWhereWithoutOffspringFromMotherInput, AnimalUpdateWithoutOffspringFromMotherInput>, AnimalUncheckedUpdateWithoutOffspringFromMotherInput>
  }

  export type AnimalUpdateManyWithoutMotherNestedInput = {
    create?: XOR<AnimalCreateWithoutMotherInput, AnimalUncheckedCreateWithoutMotherInput> | AnimalCreateWithoutMotherInput[] | AnimalUncheckedCreateWithoutMotherInput[]
    connectOrCreate?: AnimalCreateOrConnectWithoutMotherInput | AnimalCreateOrConnectWithoutMotherInput[]
    upsert?: AnimalUpsertWithWhereUniqueWithoutMotherInput | AnimalUpsertWithWhereUniqueWithoutMotherInput[]
    createMany?: AnimalCreateManyMotherInputEnvelope
    set?: AnimalWhereUniqueInput | AnimalWhereUniqueInput[]
    disconnect?: AnimalWhereUniqueInput | AnimalWhereUniqueInput[]
    delete?: AnimalWhereUniqueInput | AnimalWhereUniqueInput[]
    connect?: AnimalWhereUniqueInput | AnimalWhereUniqueInput[]
    update?: AnimalUpdateWithWhereUniqueWithoutMotherInput | AnimalUpdateWithWhereUniqueWithoutMotherInput[]
    updateMany?: AnimalUpdateManyWithWhereWithoutMotherInput | AnimalUpdateManyWithWhereWithoutMotherInput[]
    deleteMany?: AnimalScalarWhereInput | AnimalScalarWhereInput[]
  }

  export type UserUpdateOneRequiredWithoutAnimalsNestedInput = {
    create?: XOR<UserCreateWithoutAnimalsInput, UserUncheckedCreateWithoutAnimalsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAnimalsInput
    upsert?: UserUpsertWithoutAnimalsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAnimalsInput, UserUpdateWithoutAnimalsInput>, UserUncheckedUpdateWithoutAnimalsInput>
  }

  export type DewormingUpdateManyWithoutAnimalNestedInput = {
    create?: XOR<DewormingCreateWithoutAnimalInput, DewormingUncheckedCreateWithoutAnimalInput> | DewormingCreateWithoutAnimalInput[] | DewormingUncheckedCreateWithoutAnimalInput[]
    connectOrCreate?: DewormingCreateOrConnectWithoutAnimalInput | DewormingCreateOrConnectWithoutAnimalInput[]
    upsert?: DewormingUpsertWithWhereUniqueWithoutAnimalInput | DewormingUpsertWithWhereUniqueWithoutAnimalInput[]
    createMany?: DewormingCreateManyAnimalInputEnvelope
    set?: DewormingWhereUniqueInput | DewormingWhereUniqueInput[]
    disconnect?: DewormingWhereUniqueInput | DewormingWhereUniqueInput[]
    delete?: DewormingWhereUniqueInput | DewormingWhereUniqueInput[]
    connect?: DewormingWhereUniqueInput | DewormingWhereUniqueInput[]
    update?: DewormingUpdateWithWhereUniqueWithoutAnimalInput | DewormingUpdateWithWhereUniqueWithoutAnimalInput[]
    updateMany?: DewormingUpdateManyWithWhereWithoutAnimalInput | DewormingUpdateManyWithWhereWithoutAnimalInput[]
    deleteMany?: DewormingScalarWhereInput | DewormingScalarWhereInput[]
  }

  export type DiseaseUpdateManyWithoutAnimalNestedInput = {
    create?: XOR<DiseaseCreateWithoutAnimalInput, DiseaseUncheckedCreateWithoutAnimalInput> | DiseaseCreateWithoutAnimalInput[] | DiseaseUncheckedCreateWithoutAnimalInput[]
    connectOrCreate?: DiseaseCreateOrConnectWithoutAnimalInput | DiseaseCreateOrConnectWithoutAnimalInput[]
    upsert?: DiseaseUpsertWithWhereUniqueWithoutAnimalInput | DiseaseUpsertWithWhereUniqueWithoutAnimalInput[]
    createMany?: DiseaseCreateManyAnimalInputEnvelope
    set?: DiseaseWhereUniqueInput | DiseaseWhereUniqueInput[]
    disconnect?: DiseaseWhereUniqueInput | DiseaseWhereUniqueInput[]
    delete?: DiseaseWhereUniqueInput | DiseaseWhereUniqueInput[]
    connect?: DiseaseWhereUniqueInput | DiseaseWhereUniqueInput[]
    update?: DiseaseUpdateWithWhereUniqueWithoutAnimalInput | DiseaseUpdateWithWhereUniqueWithoutAnimalInput[]
    updateMany?: DiseaseUpdateManyWithWhereWithoutAnimalInput | DiseaseUpdateManyWithWhereWithoutAnimalInput[]
    deleteMany?: DiseaseScalarWhereInput | DiseaseScalarWhereInput[]
  }

  export type NotificationUpdateManyWithoutAnimalNestedInput = {
    create?: XOR<NotificationCreateWithoutAnimalInput, NotificationUncheckedCreateWithoutAnimalInput> | NotificationCreateWithoutAnimalInput[] | NotificationUncheckedCreateWithoutAnimalInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutAnimalInput | NotificationCreateOrConnectWithoutAnimalInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutAnimalInput | NotificationUpsertWithWhereUniqueWithoutAnimalInput[]
    createMany?: NotificationCreateManyAnimalInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutAnimalInput | NotificationUpdateWithWhereUniqueWithoutAnimalInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutAnimalInput | NotificationUpdateManyWithWhereWithoutAnimalInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type VaccineUpdateManyWithoutAnimalNestedInput = {
    create?: XOR<VaccineCreateWithoutAnimalInput, VaccineUncheckedCreateWithoutAnimalInput> | VaccineCreateWithoutAnimalInput[] | VaccineUncheckedCreateWithoutAnimalInput[]
    connectOrCreate?: VaccineCreateOrConnectWithoutAnimalInput | VaccineCreateOrConnectWithoutAnimalInput[]
    upsert?: VaccineUpsertWithWhereUniqueWithoutAnimalInput | VaccineUpsertWithWhereUniqueWithoutAnimalInput[]
    createMany?: VaccineCreateManyAnimalInputEnvelope
    set?: VaccineWhereUniqueInput | VaccineWhereUniqueInput[]
    disconnect?: VaccineWhereUniqueInput | VaccineWhereUniqueInput[]
    delete?: VaccineWhereUniqueInput | VaccineWhereUniqueInput[]
    connect?: VaccineWhereUniqueInput | VaccineWhereUniqueInput[]
    update?: VaccineUpdateWithWhereUniqueWithoutAnimalInput | VaccineUpdateWithWhereUniqueWithoutAnimalInput[]
    updateMany?: VaccineUpdateManyWithWhereWithoutAnimalInput | VaccineUpdateManyWithWhereWithoutAnimalInput[]
    deleteMany?: VaccineScalarWhereInput | VaccineScalarWhereInput[]
  }

  export type AnimalUncheckedUpdateManyWithoutBullNestedInput = {
    create?: XOR<AnimalCreateWithoutBullInput, AnimalUncheckedCreateWithoutBullInput> | AnimalCreateWithoutBullInput[] | AnimalUncheckedCreateWithoutBullInput[]
    connectOrCreate?: AnimalCreateOrConnectWithoutBullInput | AnimalCreateOrConnectWithoutBullInput[]
    upsert?: AnimalUpsertWithWhereUniqueWithoutBullInput | AnimalUpsertWithWhereUniqueWithoutBullInput[]
    createMany?: AnimalCreateManyBullInputEnvelope
    set?: AnimalWhereUniqueInput | AnimalWhereUniqueInput[]
    disconnect?: AnimalWhereUniqueInput | AnimalWhereUniqueInput[]
    delete?: AnimalWhereUniqueInput | AnimalWhereUniqueInput[]
    connect?: AnimalWhereUniqueInput | AnimalWhereUniqueInput[]
    update?: AnimalUpdateWithWhereUniqueWithoutBullInput | AnimalUpdateWithWhereUniqueWithoutBullInput[]
    updateMany?: AnimalUpdateManyWithWhereWithoutBullInput | AnimalUpdateManyWithWhereWithoutBullInput[]
    deleteMany?: AnimalScalarWhereInput | AnimalScalarWhereInput[]
  }

  export type AnimalUncheckedUpdateManyWithoutFatherNestedInput = {
    create?: XOR<AnimalCreateWithoutFatherInput, AnimalUncheckedCreateWithoutFatherInput> | AnimalCreateWithoutFatherInput[] | AnimalUncheckedCreateWithoutFatherInput[]
    connectOrCreate?: AnimalCreateOrConnectWithoutFatherInput | AnimalCreateOrConnectWithoutFatherInput[]
    upsert?: AnimalUpsertWithWhereUniqueWithoutFatherInput | AnimalUpsertWithWhereUniqueWithoutFatherInput[]
    createMany?: AnimalCreateManyFatherInputEnvelope
    set?: AnimalWhereUniqueInput | AnimalWhereUniqueInput[]
    disconnect?: AnimalWhereUniqueInput | AnimalWhereUniqueInput[]
    delete?: AnimalWhereUniqueInput | AnimalWhereUniqueInput[]
    connect?: AnimalWhereUniqueInput | AnimalWhereUniqueInput[]
    update?: AnimalUpdateWithWhereUniqueWithoutFatherInput | AnimalUpdateWithWhereUniqueWithoutFatherInput[]
    updateMany?: AnimalUpdateManyWithWhereWithoutFatherInput | AnimalUpdateManyWithWhereWithoutFatherInput[]
    deleteMany?: AnimalScalarWhereInput | AnimalScalarWhereInput[]
  }

  export type AnimalUncheckedUpdateManyWithoutMotherNestedInput = {
    create?: XOR<AnimalCreateWithoutMotherInput, AnimalUncheckedCreateWithoutMotherInput> | AnimalCreateWithoutMotherInput[] | AnimalUncheckedCreateWithoutMotherInput[]
    connectOrCreate?: AnimalCreateOrConnectWithoutMotherInput | AnimalCreateOrConnectWithoutMotherInput[]
    upsert?: AnimalUpsertWithWhereUniqueWithoutMotherInput | AnimalUpsertWithWhereUniqueWithoutMotherInput[]
    createMany?: AnimalCreateManyMotherInputEnvelope
    set?: AnimalWhereUniqueInput | AnimalWhereUniqueInput[]
    disconnect?: AnimalWhereUniqueInput | AnimalWhereUniqueInput[]
    delete?: AnimalWhereUniqueInput | AnimalWhereUniqueInput[]
    connect?: AnimalWhereUniqueInput | AnimalWhereUniqueInput[]
    update?: AnimalUpdateWithWhereUniqueWithoutMotherInput | AnimalUpdateWithWhereUniqueWithoutMotherInput[]
    updateMany?: AnimalUpdateManyWithWhereWithoutMotherInput | AnimalUpdateManyWithWhereWithoutMotherInput[]
    deleteMany?: AnimalScalarWhereInput | AnimalScalarWhereInput[]
  }

  export type DewormingUncheckedUpdateManyWithoutAnimalNestedInput = {
    create?: XOR<DewormingCreateWithoutAnimalInput, DewormingUncheckedCreateWithoutAnimalInput> | DewormingCreateWithoutAnimalInput[] | DewormingUncheckedCreateWithoutAnimalInput[]
    connectOrCreate?: DewormingCreateOrConnectWithoutAnimalInput | DewormingCreateOrConnectWithoutAnimalInput[]
    upsert?: DewormingUpsertWithWhereUniqueWithoutAnimalInput | DewormingUpsertWithWhereUniqueWithoutAnimalInput[]
    createMany?: DewormingCreateManyAnimalInputEnvelope
    set?: DewormingWhereUniqueInput | DewormingWhereUniqueInput[]
    disconnect?: DewormingWhereUniqueInput | DewormingWhereUniqueInput[]
    delete?: DewormingWhereUniqueInput | DewormingWhereUniqueInput[]
    connect?: DewormingWhereUniqueInput | DewormingWhereUniqueInput[]
    update?: DewormingUpdateWithWhereUniqueWithoutAnimalInput | DewormingUpdateWithWhereUniqueWithoutAnimalInput[]
    updateMany?: DewormingUpdateManyWithWhereWithoutAnimalInput | DewormingUpdateManyWithWhereWithoutAnimalInput[]
    deleteMany?: DewormingScalarWhereInput | DewormingScalarWhereInput[]
  }

  export type DiseaseUncheckedUpdateManyWithoutAnimalNestedInput = {
    create?: XOR<DiseaseCreateWithoutAnimalInput, DiseaseUncheckedCreateWithoutAnimalInput> | DiseaseCreateWithoutAnimalInput[] | DiseaseUncheckedCreateWithoutAnimalInput[]
    connectOrCreate?: DiseaseCreateOrConnectWithoutAnimalInput | DiseaseCreateOrConnectWithoutAnimalInput[]
    upsert?: DiseaseUpsertWithWhereUniqueWithoutAnimalInput | DiseaseUpsertWithWhereUniqueWithoutAnimalInput[]
    createMany?: DiseaseCreateManyAnimalInputEnvelope
    set?: DiseaseWhereUniqueInput | DiseaseWhereUniqueInput[]
    disconnect?: DiseaseWhereUniqueInput | DiseaseWhereUniqueInput[]
    delete?: DiseaseWhereUniqueInput | DiseaseWhereUniqueInput[]
    connect?: DiseaseWhereUniqueInput | DiseaseWhereUniqueInput[]
    update?: DiseaseUpdateWithWhereUniqueWithoutAnimalInput | DiseaseUpdateWithWhereUniqueWithoutAnimalInput[]
    updateMany?: DiseaseUpdateManyWithWhereWithoutAnimalInput | DiseaseUpdateManyWithWhereWithoutAnimalInput[]
    deleteMany?: DiseaseScalarWhereInput | DiseaseScalarWhereInput[]
  }

  export type NotificationUncheckedUpdateManyWithoutAnimalNestedInput = {
    create?: XOR<NotificationCreateWithoutAnimalInput, NotificationUncheckedCreateWithoutAnimalInput> | NotificationCreateWithoutAnimalInput[] | NotificationUncheckedCreateWithoutAnimalInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutAnimalInput | NotificationCreateOrConnectWithoutAnimalInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutAnimalInput | NotificationUpsertWithWhereUniqueWithoutAnimalInput[]
    createMany?: NotificationCreateManyAnimalInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutAnimalInput | NotificationUpdateWithWhereUniqueWithoutAnimalInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutAnimalInput | NotificationUpdateManyWithWhereWithoutAnimalInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type VaccineUncheckedUpdateManyWithoutAnimalNestedInput = {
    create?: XOR<VaccineCreateWithoutAnimalInput, VaccineUncheckedCreateWithoutAnimalInput> | VaccineCreateWithoutAnimalInput[] | VaccineUncheckedCreateWithoutAnimalInput[]
    connectOrCreate?: VaccineCreateOrConnectWithoutAnimalInput | VaccineCreateOrConnectWithoutAnimalInput[]
    upsert?: VaccineUpsertWithWhereUniqueWithoutAnimalInput | VaccineUpsertWithWhereUniqueWithoutAnimalInput[]
    createMany?: VaccineCreateManyAnimalInputEnvelope
    set?: VaccineWhereUniqueInput | VaccineWhereUniqueInput[]
    disconnect?: VaccineWhereUniqueInput | VaccineWhereUniqueInput[]
    delete?: VaccineWhereUniqueInput | VaccineWhereUniqueInput[]
    connect?: VaccineWhereUniqueInput | VaccineWhereUniqueInput[]
    update?: VaccineUpdateWithWhereUniqueWithoutAnimalInput | VaccineUpdateWithWhereUniqueWithoutAnimalInput[]
    updateMany?: VaccineUpdateManyWithWhereWithoutAnimalInput | VaccineUpdateManyWithWhereWithoutAnimalInput[]
    deleteMany?: VaccineScalarWhereInput | VaccineScalarWhereInput[]
  }

  export type AnimalCreateNestedOneWithoutDiseasesInput = {
    create?: XOR<AnimalCreateWithoutDiseasesInput, AnimalUncheckedCreateWithoutDiseasesInput>
    connectOrCreate?: AnimalCreateOrConnectWithoutDiseasesInput
    connect?: AnimalWhereUniqueInput
  }

  export type AnimalUpdateOneRequiredWithoutDiseasesNestedInput = {
    create?: XOR<AnimalCreateWithoutDiseasesInput, AnimalUncheckedCreateWithoutDiseasesInput>
    connectOrCreate?: AnimalCreateOrConnectWithoutDiseasesInput
    upsert?: AnimalUpsertWithoutDiseasesInput
    connect?: AnimalWhereUniqueInput
    update?: XOR<XOR<AnimalUpdateToOneWithWhereWithoutDiseasesInput, AnimalUpdateWithoutDiseasesInput>, AnimalUncheckedUpdateWithoutDiseasesInput>
  }

  export type AnimalCreateNestedOneWithoutVaccinesInput = {
    create?: XOR<AnimalCreateWithoutVaccinesInput, AnimalUncheckedCreateWithoutVaccinesInput>
    connectOrCreate?: AnimalCreateOrConnectWithoutVaccinesInput
    connect?: AnimalWhereUniqueInput
  }

  export type AnimalUpdateOneRequiredWithoutVaccinesNestedInput = {
    create?: XOR<AnimalCreateWithoutVaccinesInput, AnimalUncheckedCreateWithoutVaccinesInput>
    connectOrCreate?: AnimalCreateOrConnectWithoutVaccinesInput
    upsert?: AnimalUpsertWithoutVaccinesInput
    connect?: AnimalWhereUniqueInput
    update?: XOR<XOR<AnimalUpdateToOneWithWhereWithoutVaccinesInput, AnimalUpdateWithoutVaccinesInput>, AnimalUncheckedUpdateWithoutVaccinesInput>
  }

  export type AnimalCreateNestedOneWithoutDewormingsInput = {
    create?: XOR<AnimalCreateWithoutDewormingsInput, AnimalUncheckedCreateWithoutDewormingsInput>
    connectOrCreate?: AnimalCreateOrConnectWithoutDewormingsInput
    connect?: AnimalWhereUniqueInput
  }

  export type AnimalUpdateOneRequiredWithoutDewormingsNestedInput = {
    create?: XOR<AnimalCreateWithoutDewormingsInput, AnimalUncheckedCreateWithoutDewormingsInput>
    connectOrCreate?: AnimalCreateOrConnectWithoutDewormingsInput
    upsert?: AnimalUpsertWithoutDewormingsInput
    connect?: AnimalWhereUniqueInput
    update?: XOR<XOR<AnimalUpdateToOneWithWhereWithoutDewormingsInput, AnimalUpdateWithoutDewormingsInput>, AnimalUncheckedUpdateWithoutDewormingsInput>
  }

  export type UserCreateNestedOneWithoutAccountsInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    connect?: UserWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutAccountsNestedInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    upsert?: UserUpsertWithoutAccountsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAccountsInput, UserUpdateWithoutAccountsInput>, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    upsert?: UserUpsertWithoutSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionsInput, UserUpdateWithoutSessionsInput>, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserCreateNestedOneWithoutAuthenticatorInput = {
    create?: XOR<UserCreateWithoutAuthenticatorInput, UserUncheckedCreateWithoutAuthenticatorInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuthenticatorInput
    connect?: UserWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneRequiredWithoutAuthenticatorNestedInput = {
    create?: XOR<UserCreateWithoutAuthenticatorInput, UserUncheckedCreateWithoutAuthenticatorInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuthenticatorInput
    upsert?: UserUpsertWithoutAuthenticatorInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAuthenticatorInput, UserUpdateWithoutAuthenticatorInput>, UserUncheckedUpdateWithoutAuthenticatorInput>
  }

  export type AnimalCreateNestedOneWithoutNotificationInput = {
    create?: XOR<AnimalCreateWithoutNotificationInput, AnimalUncheckedCreateWithoutNotificationInput>
    connectOrCreate?: AnimalCreateOrConnectWithoutNotificationInput
    connect?: AnimalWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutNotificationInput = {
    create?: XOR<UserCreateWithoutNotificationInput, UserUncheckedCreateWithoutNotificationInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificationInput
    connect?: UserWhereUniqueInput
  }

  export type AnimalUpdateOneRequiredWithoutNotificationNestedInput = {
    create?: XOR<AnimalCreateWithoutNotificationInput, AnimalUncheckedCreateWithoutNotificationInput>
    connectOrCreate?: AnimalCreateOrConnectWithoutNotificationInput
    upsert?: AnimalUpsertWithoutNotificationInput
    connect?: AnimalWhereUniqueInput
    update?: XOR<XOR<AnimalUpdateToOneWithWhereWithoutNotificationInput, AnimalUpdateWithoutNotificationInput>, AnimalUncheckedUpdateWithoutNotificationInput>
  }

  export type UserUpdateOneRequiredWithoutNotificationNestedInput = {
    create?: XOR<UserCreateWithoutNotificationInput, UserUncheckedCreateWithoutNotificationInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificationInput
    upsert?: UserUpsertWithoutNotificationInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutNotificationInput, UserUpdateWithoutNotificationInput>, UserUncheckedUpdateWithoutNotificationInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type AccountCreateWithoutUserInput = {
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUncheckedCreateWithoutUserInput = {
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountCreateOrConnectWithoutUserInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountCreateManyUserInputEnvelope = {
    data: AccountCreateManyUserInput | AccountCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AnimalCreateWithoutOwnerInput = {
    id?: string
    manualId: string
    gender: string
    birthDate: Date | string
    weight: number
    breed: string
    category?: string
    reproductiveStatus?: string | null
    handlingType?: string | null
    protocol?: string | null
    andrological?: string | null
    expectedDueDate?: Date | string | null
    fetalGender?: string | null
    bullIatf?: string | null
    bodyConditionScore?: number | null
    observations?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    dewormingDate?: Date | string | null
    dewormingExpiry?: Date | string | null
    dewormingName?: string | null
    status?: string
    vaccineDate?: Date | string | null
    vaccineExpiry?: Date | string | null
    vaccineName?: string | null
    bull?: AnimalCreateNestedOneWithoutOffspringFromBullInput
    offspringFromBull?: AnimalCreateNestedManyWithoutBullInput
    father?: AnimalCreateNestedOneWithoutOffspringFromFatherInput
    offspringFromFather?: AnimalCreateNestedManyWithoutFatherInput
    mother?: AnimalCreateNestedOneWithoutOffspringFromMotherInput
    offspringFromMother?: AnimalCreateNestedManyWithoutMotherInput
    dewormings?: DewormingCreateNestedManyWithoutAnimalInput
    diseases?: DiseaseCreateNestedManyWithoutAnimalInput
    Notification?: NotificationCreateNestedManyWithoutAnimalInput
    vaccines?: VaccineCreateNestedManyWithoutAnimalInput
  }

  export type AnimalUncheckedCreateWithoutOwnerInput = {
    id?: string
    manualId: string
    gender: string
    birthDate: Date | string
    weight: number
    breed: string
    category?: string
    motherId?: string | null
    fatherId?: string | null
    reproductiveStatus?: string | null
    handlingType?: string | null
    bullId?: string | null
    protocol?: string | null
    andrological?: string | null
    expectedDueDate?: Date | string | null
    fetalGender?: string | null
    bullIatf?: string | null
    bodyConditionScore?: number | null
    observations?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    dewormingDate?: Date | string | null
    dewormingExpiry?: Date | string | null
    dewormingName?: string | null
    status?: string
    vaccineDate?: Date | string | null
    vaccineExpiry?: Date | string | null
    vaccineName?: string | null
    offspringFromBull?: AnimalUncheckedCreateNestedManyWithoutBullInput
    offspringFromFather?: AnimalUncheckedCreateNestedManyWithoutFatherInput
    offspringFromMother?: AnimalUncheckedCreateNestedManyWithoutMotherInput
    dewormings?: DewormingUncheckedCreateNestedManyWithoutAnimalInput
    diseases?: DiseaseUncheckedCreateNestedManyWithoutAnimalInput
    Notification?: NotificationUncheckedCreateNestedManyWithoutAnimalInput
    vaccines?: VaccineUncheckedCreateNestedManyWithoutAnimalInput
  }

  export type AnimalCreateOrConnectWithoutOwnerInput = {
    where: AnimalWhereUniqueInput
    create: XOR<AnimalCreateWithoutOwnerInput, AnimalUncheckedCreateWithoutOwnerInput>
  }

  export type AnimalCreateManyOwnerInputEnvelope = {
    data: AnimalCreateManyOwnerInput | AnimalCreateManyOwnerInput[]
    skipDuplicates?: boolean
  }

  export type AuthenticatorCreateWithoutUserInput = {
    credentialID: string
    providerAccountId: string
    credentialPublicKey: string
    counter: number
    credentialDeviceType: string
    credentialBackedUp: boolean
    transports?: string | null
  }

  export type AuthenticatorUncheckedCreateWithoutUserInput = {
    credentialID: string
    providerAccountId: string
    credentialPublicKey: string
    counter: number
    credentialDeviceType: string
    credentialBackedUp: boolean
    transports?: string | null
  }

  export type AuthenticatorCreateOrConnectWithoutUserInput = {
    where: AuthenticatorWhereUniqueInput
    create: XOR<AuthenticatorCreateWithoutUserInput, AuthenticatorUncheckedCreateWithoutUserInput>
  }

  export type AuthenticatorCreateManyUserInputEnvelope = {
    data: AuthenticatorCreateManyUserInput | AuthenticatorCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type NotificationCreateWithoutUserInput = {
    id?: string
    message: string
    notifyAt: Date | string
    read?: boolean
    createdAt?: Date | string
    Animal: AnimalCreateNestedOneWithoutNotificationInput
  }

  export type NotificationUncheckedCreateWithoutUserInput = {
    id?: string
    message: string
    notifyAt: Date | string
    read?: boolean
    animalId: string
    createdAt?: Date | string
  }

  export type NotificationCreateOrConnectWithoutUserInput = {
    where: NotificationWhereUniqueInput
    create: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput>
  }

  export type NotificationCreateManyUserInputEnvelope = {
    data: NotificationCreateManyUserInput | NotificationCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SessionCreateWithoutUserInput = {
    sessionToken: string
    expires: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SessionUncheckedCreateWithoutUserInput = {
    sessionToken: string
    expires: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionCreateManyUserInputEnvelope = {
    data: SessionCreateManyUserInput | SessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AccountUpsertWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    update: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountUpdateWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    data: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
  }

  export type AccountUpdateManyWithWhereWithoutUserInput = {
    where: AccountScalarWhereInput
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyWithoutUserInput>
  }

  export type AccountScalarWhereInput = {
    AND?: AccountScalarWhereInput | AccountScalarWhereInput[]
    OR?: AccountScalarWhereInput[]
    NOT?: AccountScalarWhereInput | AccountScalarWhereInput[]
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
  }

  export type AnimalUpsertWithWhereUniqueWithoutOwnerInput = {
    where: AnimalWhereUniqueInput
    update: XOR<AnimalUpdateWithoutOwnerInput, AnimalUncheckedUpdateWithoutOwnerInput>
    create: XOR<AnimalCreateWithoutOwnerInput, AnimalUncheckedCreateWithoutOwnerInput>
  }

  export type AnimalUpdateWithWhereUniqueWithoutOwnerInput = {
    where: AnimalWhereUniqueInput
    data: XOR<AnimalUpdateWithoutOwnerInput, AnimalUncheckedUpdateWithoutOwnerInput>
  }

  export type AnimalUpdateManyWithWhereWithoutOwnerInput = {
    where: AnimalScalarWhereInput
    data: XOR<AnimalUpdateManyMutationInput, AnimalUncheckedUpdateManyWithoutOwnerInput>
  }

  export type AnimalScalarWhereInput = {
    AND?: AnimalScalarWhereInput | AnimalScalarWhereInput[]
    OR?: AnimalScalarWhereInput[]
    NOT?: AnimalScalarWhereInput | AnimalScalarWhereInput[]
    id?: StringFilter<"Animal"> | string
    manualId?: StringFilter<"Animal"> | string
    gender?: StringFilter<"Animal"> | string
    birthDate?: DateTimeFilter<"Animal"> | Date | string
    weight?: FloatFilter<"Animal"> | number
    breed?: StringFilter<"Animal"> | string
    category?: StringFilter<"Animal"> | string
    motherId?: StringNullableFilter<"Animal"> | string | null
    fatherId?: StringNullableFilter<"Animal"> | string | null
    reproductiveStatus?: StringNullableFilter<"Animal"> | string | null
    handlingType?: StringNullableFilter<"Animal"> | string | null
    bullId?: StringNullableFilter<"Animal"> | string | null
    protocol?: StringNullableFilter<"Animal"> | string | null
    andrological?: StringNullableFilter<"Animal"> | string | null
    expectedDueDate?: DateTimeNullableFilter<"Animal"> | Date | string | null
    fetalGender?: StringNullableFilter<"Animal"> | string | null
    bullIatf?: StringNullableFilter<"Animal"> | string | null
    bodyConditionScore?: FloatNullableFilter<"Animal"> | number | null
    observations?: StringNullableFilter<"Animal"> | string | null
    ownerId?: StringFilter<"Animal"> | string
    createdAt?: DateTimeFilter<"Animal"> | Date | string
    updatedAt?: DateTimeFilter<"Animal"> | Date | string
    dewormingDate?: DateTimeNullableFilter<"Animal"> | Date | string | null
    dewormingExpiry?: DateTimeNullableFilter<"Animal"> | Date | string | null
    dewormingName?: StringNullableFilter<"Animal"> | string | null
    status?: StringFilter<"Animal"> | string
    vaccineDate?: DateTimeNullableFilter<"Animal"> | Date | string | null
    vaccineExpiry?: DateTimeNullableFilter<"Animal"> | Date | string | null
    vaccineName?: StringNullableFilter<"Animal"> | string | null
  }

  export type AuthenticatorUpsertWithWhereUniqueWithoutUserInput = {
    where: AuthenticatorWhereUniqueInput
    update: XOR<AuthenticatorUpdateWithoutUserInput, AuthenticatorUncheckedUpdateWithoutUserInput>
    create: XOR<AuthenticatorCreateWithoutUserInput, AuthenticatorUncheckedCreateWithoutUserInput>
  }

  export type AuthenticatorUpdateWithWhereUniqueWithoutUserInput = {
    where: AuthenticatorWhereUniqueInput
    data: XOR<AuthenticatorUpdateWithoutUserInput, AuthenticatorUncheckedUpdateWithoutUserInput>
  }

  export type AuthenticatorUpdateManyWithWhereWithoutUserInput = {
    where: AuthenticatorScalarWhereInput
    data: XOR<AuthenticatorUpdateManyMutationInput, AuthenticatorUncheckedUpdateManyWithoutUserInput>
  }

  export type AuthenticatorScalarWhereInput = {
    AND?: AuthenticatorScalarWhereInput | AuthenticatorScalarWhereInput[]
    OR?: AuthenticatorScalarWhereInput[]
    NOT?: AuthenticatorScalarWhereInput | AuthenticatorScalarWhereInput[]
    credentialID?: StringFilter<"Authenticator"> | string
    userId?: StringFilter<"Authenticator"> | string
    providerAccountId?: StringFilter<"Authenticator"> | string
    credentialPublicKey?: StringFilter<"Authenticator"> | string
    counter?: IntFilter<"Authenticator"> | number
    credentialDeviceType?: StringFilter<"Authenticator"> | string
    credentialBackedUp?: BoolFilter<"Authenticator"> | boolean
    transports?: StringNullableFilter<"Authenticator"> | string | null
  }

  export type NotificationUpsertWithWhereUniqueWithoutUserInput = {
    where: NotificationWhereUniqueInput
    update: XOR<NotificationUpdateWithoutUserInput, NotificationUncheckedUpdateWithoutUserInput>
    create: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput>
  }

  export type NotificationUpdateWithWhereUniqueWithoutUserInput = {
    where: NotificationWhereUniqueInput
    data: XOR<NotificationUpdateWithoutUserInput, NotificationUncheckedUpdateWithoutUserInput>
  }

  export type NotificationUpdateManyWithWhereWithoutUserInput = {
    where: NotificationScalarWhereInput
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyWithoutUserInput>
  }

  export type NotificationScalarWhereInput = {
    AND?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
    OR?: NotificationScalarWhereInput[]
    NOT?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
    id?: UuidFilter<"Notification"> | string
    message?: StringFilter<"Notification"> | string
    notifyAt?: DateTimeFilter<"Notification"> | Date | string
    read?: BoolFilter<"Notification"> | boolean
    userId?: StringFilter<"Notification"> | string
    animalId?: StringFilter<"Notification"> | string
    createdAt?: DateTimeFilter<"Notification"> | Date | string
  }

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
  }

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutUserInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    sessionToken?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
  }

  export type AnimalCreateWithoutOffspringFromBullInput = {
    id?: string
    manualId: string
    gender: string
    birthDate: Date | string
    weight: number
    breed: string
    category?: string
    reproductiveStatus?: string | null
    handlingType?: string | null
    protocol?: string | null
    andrological?: string | null
    expectedDueDate?: Date | string | null
    fetalGender?: string | null
    bullIatf?: string | null
    bodyConditionScore?: number | null
    observations?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    dewormingDate?: Date | string | null
    dewormingExpiry?: Date | string | null
    dewormingName?: string | null
    status?: string
    vaccineDate?: Date | string | null
    vaccineExpiry?: Date | string | null
    vaccineName?: string | null
    bull?: AnimalCreateNestedOneWithoutOffspringFromBullInput
    father?: AnimalCreateNestedOneWithoutOffspringFromFatherInput
    offspringFromFather?: AnimalCreateNestedManyWithoutFatherInput
    mother?: AnimalCreateNestedOneWithoutOffspringFromMotherInput
    offspringFromMother?: AnimalCreateNestedManyWithoutMotherInput
    owner: UserCreateNestedOneWithoutAnimalsInput
    dewormings?: DewormingCreateNestedManyWithoutAnimalInput
    diseases?: DiseaseCreateNestedManyWithoutAnimalInput
    Notification?: NotificationCreateNestedManyWithoutAnimalInput
    vaccines?: VaccineCreateNestedManyWithoutAnimalInput
  }

  export type AnimalUncheckedCreateWithoutOffspringFromBullInput = {
    id?: string
    manualId: string
    gender: string
    birthDate: Date | string
    weight: number
    breed: string
    category?: string
    motherId?: string | null
    fatherId?: string | null
    reproductiveStatus?: string | null
    handlingType?: string | null
    bullId?: string | null
    protocol?: string | null
    andrological?: string | null
    expectedDueDate?: Date | string | null
    fetalGender?: string | null
    bullIatf?: string | null
    bodyConditionScore?: number | null
    observations?: string | null
    ownerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    dewormingDate?: Date | string | null
    dewormingExpiry?: Date | string | null
    dewormingName?: string | null
    status?: string
    vaccineDate?: Date | string | null
    vaccineExpiry?: Date | string | null
    vaccineName?: string | null
    offspringFromFather?: AnimalUncheckedCreateNestedManyWithoutFatherInput
    offspringFromMother?: AnimalUncheckedCreateNestedManyWithoutMotherInput
    dewormings?: DewormingUncheckedCreateNestedManyWithoutAnimalInput
    diseases?: DiseaseUncheckedCreateNestedManyWithoutAnimalInput
    Notification?: NotificationUncheckedCreateNestedManyWithoutAnimalInput
    vaccines?: VaccineUncheckedCreateNestedManyWithoutAnimalInput
  }

  export type AnimalCreateOrConnectWithoutOffspringFromBullInput = {
    where: AnimalWhereUniqueInput
    create: XOR<AnimalCreateWithoutOffspringFromBullInput, AnimalUncheckedCreateWithoutOffspringFromBullInput>
  }

  export type AnimalCreateWithoutBullInput = {
    id?: string
    manualId: string
    gender: string
    birthDate: Date | string
    weight: number
    breed: string
    category?: string
    reproductiveStatus?: string | null
    handlingType?: string | null
    protocol?: string | null
    andrological?: string | null
    expectedDueDate?: Date | string | null
    fetalGender?: string | null
    bullIatf?: string | null
    bodyConditionScore?: number | null
    observations?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    dewormingDate?: Date | string | null
    dewormingExpiry?: Date | string | null
    dewormingName?: string | null
    status?: string
    vaccineDate?: Date | string | null
    vaccineExpiry?: Date | string | null
    vaccineName?: string | null
    offspringFromBull?: AnimalCreateNestedManyWithoutBullInput
    father?: AnimalCreateNestedOneWithoutOffspringFromFatherInput
    offspringFromFather?: AnimalCreateNestedManyWithoutFatherInput
    mother?: AnimalCreateNestedOneWithoutOffspringFromMotherInput
    offspringFromMother?: AnimalCreateNestedManyWithoutMotherInput
    owner: UserCreateNestedOneWithoutAnimalsInput
    dewormings?: DewormingCreateNestedManyWithoutAnimalInput
    diseases?: DiseaseCreateNestedManyWithoutAnimalInput
    Notification?: NotificationCreateNestedManyWithoutAnimalInput
    vaccines?: VaccineCreateNestedManyWithoutAnimalInput
  }

  export type AnimalUncheckedCreateWithoutBullInput = {
    id?: string
    manualId: string
    gender: string
    birthDate: Date | string
    weight: number
    breed: string
    category?: string
    motherId?: string | null
    fatherId?: string | null
    reproductiveStatus?: string | null
    handlingType?: string | null
    protocol?: string | null
    andrological?: string | null
    expectedDueDate?: Date | string | null
    fetalGender?: string | null
    bullIatf?: string | null
    bodyConditionScore?: number | null
    observations?: string | null
    ownerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    dewormingDate?: Date | string | null
    dewormingExpiry?: Date | string | null
    dewormingName?: string | null
    status?: string
    vaccineDate?: Date | string | null
    vaccineExpiry?: Date | string | null
    vaccineName?: string | null
    offspringFromBull?: AnimalUncheckedCreateNestedManyWithoutBullInput
    offspringFromFather?: AnimalUncheckedCreateNestedManyWithoutFatherInput
    offspringFromMother?: AnimalUncheckedCreateNestedManyWithoutMotherInput
    dewormings?: DewormingUncheckedCreateNestedManyWithoutAnimalInput
    diseases?: DiseaseUncheckedCreateNestedManyWithoutAnimalInput
    Notification?: NotificationUncheckedCreateNestedManyWithoutAnimalInput
    vaccines?: VaccineUncheckedCreateNestedManyWithoutAnimalInput
  }

  export type AnimalCreateOrConnectWithoutBullInput = {
    where: AnimalWhereUniqueInput
    create: XOR<AnimalCreateWithoutBullInput, AnimalUncheckedCreateWithoutBullInput>
  }

  export type AnimalCreateManyBullInputEnvelope = {
    data: AnimalCreateManyBullInput | AnimalCreateManyBullInput[]
    skipDuplicates?: boolean
  }

  export type AnimalCreateWithoutOffspringFromFatherInput = {
    id?: string
    manualId: string
    gender: string
    birthDate: Date | string
    weight: number
    breed: string
    category?: string
    reproductiveStatus?: string | null
    handlingType?: string | null
    protocol?: string | null
    andrological?: string | null
    expectedDueDate?: Date | string | null
    fetalGender?: string | null
    bullIatf?: string | null
    bodyConditionScore?: number | null
    observations?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    dewormingDate?: Date | string | null
    dewormingExpiry?: Date | string | null
    dewormingName?: string | null
    status?: string
    vaccineDate?: Date | string | null
    vaccineExpiry?: Date | string | null
    vaccineName?: string | null
    bull?: AnimalCreateNestedOneWithoutOffspringFromBullInput
    offspringFromBull?: AnimalCreateNestedManyWithoutBullInput
    father?: AnimalCreateNestedOneWithoutOffspringFromFatherInput
    mother?: AnimalCreateNestedOneWithoutOffspringFromMotherInput
    offspringFromMother?: AnimalCreateNestedManyWithoutMotherInput
    owner: UserCreateNestedOneWithoutAnimalsInput
    dewormings?: DewormingCreateNestedManyWithoutAnimalInput
    diseases?: DiseaseCreateNestedManyWithoutAnimalInput
    Notification?: NotificationCreateNestedManyWithoutAnimalInput
    vaccines?: VaccineCreateNestedManyWithoutAnimalInput
  }

  export type AnimalUncheckedCreateWithoutOffspringFromFatherInput = {
    id?: string
    manualId: string
    gender: string
    birthDate: Date | string
    weight: number
    breed: string
    category?: string
    motherId?: string | null
    fatherId?: string | null
    reproductiveStatus?: string | null
    handlingType?: string | null
    bullId?: string | null
    protocol?: string | null
    andrological?: string | null
    expectedDueDate?: Date | string | null
    fetalGender?: string | null
    bullIatf?: string | null
    bodyConditionScore?: number | null
    observations?: string | null
    ownerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    dewormingDate?: Date | string | null
    dewormingExpiry?: Date | string | null
    dewormingName?: string | null
    status?: string
    vaccineDate?: Date | string | null
    vaccineExpiry?: Date | string | null
    vaccineName?: string | null
    offspringFromBull?: AnimalUncheckedCreateNestedManyWithoutBullInput
    offspringFromMother?: AnimalUncheckedCreateNestedManyWithoutMotherInput
    dewormings?: DewormingUncheckedCreateNestedManyWithoutAnimalInput
    diseases?: DiseaseUncheckedCreateNestedManyWithoutAnimalInput
    Notification?: NotificationUncheckedCreateNestedManyWithoutAnimalInput
    vaccines?: VaccineUncheckedCreateNestedManyWithoutAnimalInput
  }

  export type AnimalCreateOrConnectWithoutOffspringFromFatherInput = {
    where: AnimalWhereUniqueInput
    create: XOR<AnimalCreateWithoutOffspringFromFatherInput, AnimalUncheckedCreateWithoutOffspringFromFatherInput>
  }

  export type AnimalCreateWithoutFatherInput = {
    id?: string
    manualId: string
    gender: string
    birthDate: Date | string
    weight: number
    breed: string
    category?: string
    reproductiveStatus?: string | null
    handlingType?: string | null
    protocol?: string | null
    andrological?: string | null
    expectedDueDate?: Date | string | null
    fetalGender?: string | null
    bullIatf?: string | null
    bodyConditionScore?: number | null
    observations?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    dewormingDate?: Date | string | null
    dewormingExpiry?: Date | string | null
    dewormingName?: string | null
    status?: string
    vaccineDate?: Date | string | null
    vaccineExpiry?: Date | string | null
    vaccineName?: string | null
    bull?: AnimalCreateNestedOneWithoutOffspringFromBullInput
    offspringFromBull?: AnimalCreateNestedManyWithoutBullInput
    offspringFromFather?: AnimalCreateNestedManyWithoutFatherInput
    mother?: AnimalCreateNestedOneWithoutOffspringFromMotherInput
    offspringFromMother?: AnimalCreateNestedManyWithoutMotherInput
    owner: UserCreateNestedOneWithoutAnimalsInput
    dewormings?: DewormingCreateNestedManyWithoutAnimalInput
    diseases?: DiseaseCreateNestedManyWithoutAnimalInput
    Notification?: NotificationCreateNestedManyWithoutAnimalInput
    vaccines?: VaccineCreateNestedManyWithoutAnimalInput
  }

  export type AnimalUncheckedCreateWithoutFatherInput = {
    id?: string
    manualId: string
    gender: string
    birthDate: Date | string
    weight: number
    breed: string
    category?: string
    motherId?: string | null
    reproductiveStatus?: string | null
    handlingType?: string | null
    bullId?: string | null
    protocol?: string | null
    andrological?: string | null
    expectedDueDate?: Date | string | null
    fetalGender?: string | null
    bullIatf?: string | null
    bodyConditionScore?: number | null
    observations?: string | null
    ownerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    dewormingDate?: Date | string | null
    dewormingExpiry?: Date | string | null
    dewormingName?: string | null
    status?: string
    vaccineDate?: Date | string | null
    vaccineExpiry?: Date | string | null
    vaccineName?: string | null
    offspringFromBull?: AnimalUncheckedCreateNestedManyWithoutBullInput
    offspringFromFather?: AnimalUncheckedCreateNestedManyWithoutFatherInput
    offspringFromMother?: AnimalUncheckedCreateNestedManyWithoutMotherInput
    dewormings?: DewormingUncheckedCreateNestedManyWithoutAnimalInput
    diseases?: DiseaseUncheckedCreateNestedManyWithoutAnimalInput
    Notification?: NotificationUncheckedCreateNestedManyWithoutAnimalInput
    vaccines?: VaccineUncheckedCreateNestedManyWithoutAnimalInput
  }

  export type AnimalCreateOrConnectWithoutFatherInput = {
    where: AnimalWhereUniqueInput
    create: XOR<AnimalCreateWithoutFatherInput, AnimalUncheckedCreateWithoutFatherInput>
  }

  export type AnimalCreateManyFatherInputEnvelope = {
    data: AnimalCreateManyFatherInput | AnimalCreateManyFatherInput[]
    skipDuplicates?: boolean
  }

  export type AnimalCreateWithoutOffspringFromMotherInput = {
    id?: string
    manualId: string
    gender: string
    birthDate: Date | string
    weight: number
    breed: string
    category?: string
    reproductiveStatus?: string | null
    handlingType?: string | null
    protocol?: string | null
    andrological?: string | null
    expectedDueDate?: Date | string | null
    fetalGender?: string | null
    bullIatf?: string | null
    bodyConditionScore?: number | null
    observations?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    dewormingDate?: Date | string | null
    dewormingExpiry?: Date | string | null
    dewormingName?: string | null
    status?: string
    vaccineDate?: Date | string | null
    vaccineExpiry?: Date | string | null
    vaccineName?: string | null
    bull?: AnimalCreateNestedOneWithoutOffspringFromBullInput
    offspringFromBull?: AnimalCreateNestedManyWithoutBullInput
    father?: AnimalCreateNestedOneWithoutOffspringFromFatherInput
    offspringFromFather?: AnimalCreateNestedManyWithoutFatherInput
    mother?: AnimalCreateNestedOneWithoutOffspringFromMotherInput
    owner: UserCreateNestedOneWithoutAnimalsInput
    dewormings?: DewormingCreateNestedManyWithoutAnimalInput
    diseases?: DiseaseCreateNestedManyWithoutAnimalInput
    Notification?: NotificationCreateNestedManyWithoutAnimalInput
    vaccines?: VaccineCreateNestedManyWithoutAnimalInput
  }

  export type AnimalUncheckedCreateWithoutOffspringFromMotherInput = {
    id?: string
    manualId: string
    gender: string
    birthDate: Date | string
    weight: number
    breed: string
    category?: string
    motherId?: string | null
    fatherId?: string | null
    reproductiveStatus?: string | null
    handlingType?: string | null
    bullId?: string | null
    protocol?: string | null
    andrological?: string | null
    expectedDueDate?: Date | string | null
    fetalGender?: string | null
    bullIatf?: string | null
    bodyConditionScore?: number | null
    observations?: string | null
    ownerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    dewormingDate?: Date | string | null
    dewormingExpiry?: Date | string | null
    dewormingName?: string | null
    status?: string
    vaccineDate?: Date | string | null
    vaccineExpiry?: Date | string | null
    vaccineName?: string | null
    offspringFromBull?: AnimalUncheckedCreateNestedManyWithoutBullInput
    offspringFromFather?: AnimalUncheckedCreateNestedManyWithoutFatherInput
    dewormings?: DewormingUncheckedCreateNestedManyWithoutAnimalInput
    diseases?: DiseaseUncheckedCreateNestedManyWithoutAnimalInput
    Notification?: NotificationUncheckedCreateNestedManyWithoutAnimalInput
    vaccines?: VaccineUncheckedCreateNestedManyWithoutAnimalInput
  }

  export type AnimalCreateOrConnectWithoutOffspringFromMotherInput = {
    where: AnimalWhereUniqueInput
    create: XOR<AnimalCreateWithoutOffspringFromMotherInput, AnimalUncheckedCreateWithoutOffspringFromMotherInput>
  }

  export type AnimalCreateWithoutMotherInput = {
    id?: string
    manualId: string
    gender: string
    birthDate: Date | string
    weight: number
    breed: string
    category?: string
    reproductiveStatus?: string | null
    handlingType?: string | null
    protocol?: string | null
    andrological?: string | null
    expectedDueDate?: Date | string | null
    fetalGender?: string | null
    bullIatf?: string | null
    bodyConditionScore?: number | null
    observations?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    dewormingDate?: Date | string | null
    dewormingExpiry?: Date | string | null
    dewormingName?: string | null
    status?: string
    vaccineDate?: Date | string | null
    vaccineExpiry?: Date | string | null
    vaccineName?: string | null
    bull?: AnimalCreateNestedOneWithoutOffspringFromBullInput
    offspringFromBull?: AnimalCreateNestedManyWithoutBullInput
    father?: AnimalCreateNestedOneWithoutOffspringFromFatherInput
    offspringFromFather?: AnimalCreateNestedManyWithoutFatherInput
    offspringFromMother?: AnimalCreateNestedManyWithoutMotherInput
    owner: UserCreateNestedOneWithoutAnimalsInput
    dewormings?: DewormingCreateNestedManyWithoutAnimalInput
    diseases?: DiseaseCreateNestedManyWithoutAnimalInput
    Notification?: NotificationCreateNestedManyWithoutAnimalInput
    vaccines?: VaccineCreateNestedManyWithoutAnimalInput
  }

  export type AnimalUncheckedCreateWithoutMotherInput = {
    id?: string
    manualId: string
    gender: string
    birthDate: Date | string
    weight: number
    breed: string
    category?: string
    fatherId?: string | null
    reproductiveStatus?: string | null
    handlingType?: string | null
    bullId?: string | null
    protocol?: string | null
    andrological?: string | null
    expectedDueDate?: Date | string | null
    fetalGender?: string | null
    bullIatf?: string | null
    bodyConditionScore?: number | null
    observations?: string | null
    ownerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    dewormingDate?: Date | string | null
    dewormingExpiry?: Date | string | null
    dewormingName?: string | null
    status?: string
    vaccineDate?: Date | string | null
    vaccineExpiry?: Date | string | null
    vaccineName?: string | null
    offspringFromBull?: AnimalUncheckedCreateNestedManyWithoutBullInput
    offspringFromFather?: AnimalUncheckedCreateNestedManyWithoutFatherInput
    offspringFromMother?: AnimalUncheckedCreateNestedManyWithoutMotherInput
    dewormings?: DewormingUncheckedCreateNestedManyWithoutAnimalInput
    diseases?: DiseaseUncheckedCreateNestedManyWithoutAnimalInput
    Notification?: NotificationUncheckedCreateNestedManyWithoutAnimalInput
    vaccines?: VaccineUncheckedCreateNestedManyWithoutAnimalInput
  }

  export type AnimalCreateOrConnectWithoutMotherInput = {
    where: AnimalWhereUniqueInput
    create: XOR<AnimalCreateWithoutMotherInput, AnimalUncheckedCreateWithoutMotherInput>
  }

  export type AnimalCreateManyMotherInputEnvelope = {
    data: AnimalCreateManyMotherInput | AnimalCreateManyMotherInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutAnimalsInput = {
    id?: string
    name: string
    email: string
    cnpj?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    emailVerified?: Date | string | null
    image?: string | null
    accounts?: AccountCreateNestedManyWithoutUserInput
    Authenticator?: AuthenticatorCreateNestedManyWithoutUserInput
    Notification?: NotificationCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAnimalsInput = {
    id?: string
    name: string
    email: string
    cnpj?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    emailVerified?: Date | string | null
    image?: string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    Authenticator?: AuthenticatorUncheckedCreateNestedManyWithoutUserInput
    Notification?: NotificationUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAnimalsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAnimalsInput, UserUncheckedCreateWithoutAnimalsInput>
  }

  export type DewormingCreateWithoutAnimalInput = {
    id?: string
    name: string
    date: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DewormingUncheckedCreateWithoutAnimalInput = {
    id?: string
    name: string
    date: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DewormingCreateOrConnectWithoutAnimalInput = {
    where: DewormingWhereUniqueInput
    create: XOR<DewormingCreateWithoutAnimalInput, DewormingUncheckedCreateWithoutAnimalInput>
  }

  export type DewormingCreateManyAnimalInputEnvelope = {
    data: DewormingCreateManyAnimalInput | DewormingCreateManyAnimalInput[]
    skipDuplicates?: boolean
  }

  export type DiseaseCreateWithoutAnimalInput = {
    id?: string
    name: string
    description?: string | null
    date: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DiseaseUncheckedCreateWithoutAnimalInput = {
    id?: string
    name: string
    description?: string | null
    date: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DiseaseCreateOrConnectWithoutAnimalInput = {
    where: DiseaseWhereUniqueInput
    create: XOR<DiseaseCreateWithoutAnimalInput, DiseaseUncheckedCreateWithoutAnimalInput>
  }

  export type DiseaseCreateManyAnimalInputEnvelope = {
    data: DiseaseCreateManyAnimalInput | DiseaseCreateManyAnimalInput[]
    skipDuplicates?: boolean
  }

  export type NotificationCreateWithoutAnimalInput = {
    id?: string
    message: string
    notifyAt: Date | string
    read?: boolean
    createdAt?: Date | string
    User: UserCreateNestedOneWithoutNotificationInput
  }

  export type NotificationUncheckedCreateWithoutAnimalInput = {
    id?: string
    message: string
    notifyAt: Date | string
    read?: boolean
    userId: string
    createdAt?: Date | string
  }

  export type NotificationCreateOrConnectWithoutAnimalInput = {
    where: NotificationWhereUniqueInput
    create: XOR<NotificationCreateWithoutAnimalInput, NotificationUncheckedCreateWithoutAnimalInput>
  }

  export type NotificationCreateManyAnimalInputEnvelope = {
    data: NotificationCreateManyAnimalInput | NotificationCreateManyAnimalInput[]
    skipDuplicates?: boolean
  }

  export type VaccineCreateWithoutAnimalInput = {
    name: string
    description?: string | null
    date: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    expiryDate: Date | string
    id?: string
  }

  export type VaccineUncheckedCreateWithoutAnimalInput = {
    name: string
    description?: string | null
    date: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    expiryDate: Date | string
    id?: string
  }

  export type VaccineCreateOrConnectWithoutAnimalInput = {
    where: VaccineWhereUniqueInput
    create: XOR<VaccineCreateWithoutAnimalInput, VaccineUncheckedCreateWithoutAnimalInput>
  }

  export type VaccineCreateManyAnimalInputEnvelope = {
    data: VaccineCreateManyAnimalInput | VaccineCreateManyAnimalInput[]
    skipDuplicates?: boolean
  }

  export type AnimalUpsertWithoutOffspringFromBullInput = {
    update: XOR<AnimalUpdateWithoutOffspringFromBullInput, AnimalUncheckedUpdateWithoutOffspringFromBullInput>
    create: XOR<AnimalCreateWithoutOffspringFromBullInput, AnimalUncheckedCreateWithoutOffspringFromBullInput>
    where?: AnimalWhereInput
  }

  export type AnimalUpdateToOneWithWhereWithoutOffspringFromBullInput = {
    where?: AnimalWhereInput
    data: XOR<AnimalUpdateWithoutOffspringFromBullInput, AnimalUncheckedUpdateWithoutOffspringFromBullInput>
  }

  export type AnimalUpdateWithoutOffspringFromBullInput = {
    id?: StringFieldUpdateOperationsInput | string
    manualId?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    weight?: FloatFieldUpdateOperationsInput | number
    breed?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    reproductiveStatus?: NullableStringFieldUpdateOperationsInput | string | null
    handlingType?: NullableStringFieldUpdateOperationsInput | string | null
    protocol?: NullableStringFieldUpdateOperationsInput | string | null
    andrological?: NullableStringFieldUpdateOperationsInput | string | null
    expectedDueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fetalGender?: NullableStringFieldUpdateOperationsInput | string | null
    bullIatf?: NullableStringFieldUpdateOperationsInput | string | null
    bodyConditionScore?: NullableFloatFieldUpdateOperationsInput | number | null
    observations?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dewormingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dewormingExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dewormingName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    vaccineDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vaccineExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vaccineName?: NullableStringFieldUpdateOperationsInput | string | null
    bull?: AnimalUpdateOneWithoutOffspringFromBullNestedInput
    father?: AnimalUpdateOneWithoutOffspringFromFatherNestedInput
    offspringFromFather?: AnimalUpdateManyWithoutFatherNestedInput
    mother?: AnimalUpdateOneWithoutOffspringFromMotherNestedInput
    offspringFromMother?: AnimalUpdateManyWithoutMotherNestedInput
    owner?: UserUpdateOneRequiredWithoutAnimalsNestedInput
    dewormings?: DewormingUpdateManyWithoutAnimalNestedInput
    diseases?: DiseaseUpdateManyWithoutAnimalNestedInput
    Notification?: NotificationUpdateManyWithoutAnimalNestedInput
    vaccines?: VaccineUpdateManyWithoutAnimalNestedInput
  }

  export type AnimalUncheckedUpdateWithoutOffspringFromBullInput = {
    id?: StringFieldUpdateOperationsInput | string
    manualId?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    weight?: FloatFieldUpdateOperationsInput | number
    breed?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    motherId?: NullableStringFieldUpdateOperationsInput | string | null
    fatherId?: NullableStringFieldUpdateOperationsInput | string | null
    reproductiveStatus?: NullableStringFieldUpdateOperationsInput | string | null
    handlingType?: NullableStringFieldUpdateOperationsInput | string | null
    bullId?: NullableStringFieldUpdateOperationsInput | string | null
    protocol?: NullableStringFieldUpdateOperationsInput | string | null
    andrological?: NullableStringFieldUpdateOperationsInput | string | null
    expectedDueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fetalGender?: NullableStringFieldUpdateOperationsInput | string | null
    bullIatf?: NullableStringFieldUpdateOperationsInput | string | null
    bodyConditionScore?: NullableFloatFieldUpdateOperationsInput | number | null
    observations?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dewormingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dewormingExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dewormingName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    vaccineDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vaccineExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vaccineName?: NullableStringFieldUpdateOperationsInput | string | null
    offspringFromFather?: AnimalUncheckedUpdateManyWithoutFatherNestedInput
    offspringFromMother?: AnimalUncheckedUpdateManyWithoutMotherNestedInput
    dewormings?: DewormingUncheckedUpdateManyWithoutAnimalNestedInput
    diseases?: DiseaseUncheckedUpdateManyWithoutAnimalNestedInput
    Notification?: NotificationUncheckedUpdateManyWithoutAnimalNestedInput
    vaccines?: VaccineUncheckedUpdateManyWithoutAnimalNestedInput
  }

  export type AnimalUpsertWithWhereUniqueWithoutBullInput = {
    where: AnimalWhereUniqueInput
    update: XOR<AnimalUpdateWithoutBullInput, AnimalUncheckedUpdateWithoutBullInput>
    create: XOR<AnimalCreateWithoutBullInput, AnimalUncheckedCreateWithoutBullInput>
  }

  export type AnimalUpdateWithWhereUniqueWithoutBullInput = {
    where: AnimalWhereUniqueInput
    data: XOR<AnimalUpdateWithoutBullInput, AnimalUncheckedUpdateWithoutBullInput>
  }

  export type AnimalUpdateManyWithWhereWithoutBullInput = {
    where: AnimalScalarWhereInput
    data: XOR<AnimalUpdateManyMutationInput, AnimalUncheckedUpdateManyWithoutBullInput>
  }

  export type AnimalUpsertWithoutOffspringFromFatherInput = {
    update: XOR<AnimalUpdateWithoutOffspringFromFatherInput, AnimalUncheckedUpdateWithoutOffspringFromFatherInput>
    create: XOR<AnimalCreateWithoutOffspringFromFatherInput, AnimalUncheckedCreateWithoutOffspringFromFatherInput>
    where?: AnimalWhereInput
  }

  export type AnimalUpdateToOneWithWhereWithoutOffspringFromFatherInput = {
    where?: AnimalWhereInput
    data: XOR<AnimalUpdateWithoutOffspringFromFatherInput, AnimalUncheckedUpdateWithoutOffspringFromFatherInput>
  }

  export type AnimalUpdateWithoutOffspringFromFatherInput = {
    id?: StringFieldUpdateOperationsInput | string
    manualId?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    weight?: FloatFieldUpdateOperationsInput | number
    breed?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    reproductiveStatus?: NullableStringFieldUpdateOperationsInput | string | null
    handlingType?: NullableStringFieldUpdateOperationsInput | string | null
    protocol?: NullableStringFieldUpdateOperationsInput | string | null
    andrological?: NullableStringFieldUpdateOperationsInput | string | null
    expectedDueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fetalGender?: NullableStringFieldUpdateOperationsInput | string | null
    bullIatf?: NullableStringFieldUpdateOperationsInput | string | null
    bodyConditionScore?: NullableFloatFieldUpdateOperationsInput | number | null
    observations?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dewormingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dewormingExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dewormingName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    vaccineDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vaccineExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vaccineName?: NullableStringFieldUpdateOperationsInput | string | null
    bull?: AnimalUpdateOneWithoutOffspringFromBullNestedInput
    offspringFromBull?: AnimalUpdateManyWithoutBullNestedInput
    father?: AnimalUpdateOneWithoutOffspringFromFatherNestedInput
    mother?: AnimalUpdateOneWithoutOffspringFromMotherNestedInput
    offspringFromMother?: AnimalUpdateManyWithoutMotherNestedInput
    owner?: UserUpdateOneRequiredWithoutAnimalsNestedInput
    dewormings?: DewormingUpdateManyWithoutAnimalNestedInput
    diseases?: DiseaseUpdateManyWithoutAnimalNestedInput
    Notification?: NotificationUpdateManyWithoutAnimalNestedInput
    vaccines?: VaccineUpdateManyWithoutAnimalNestedInput
  }

  export type AnimalUncheckedUpdateWithoutOffspringFromFatherInput = {
    id?: StringFieldUpdateOperationsInput | string
    manualId?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    weight?: FloatFieldUpdateOperationsInput | number
    breed?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    motherId?: NullableStringFieldUpdateOperationsInput | string | null
    fatherId?: NullableStringFieldUpdateOperationsInput | string | null
    reproductiveStatus?: NullableStringFieldUpdateOperationsInput | string | null
    handlingType?: NullableStringFieldUpdateOperationsInput | string | null
    bullId?: NullableStringFieldUpdateOperationsInput | string | null
    protocol?: NullableStringFieldUpdateOperationsInput | string | null
    andrological?: NullableStringFieldUpdateOperationsInput | string | null
    expectedDueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fetalGender?: NullableStringFieldUpdateOperationsInput | string | null
    bullIatf?: NullableStringFieldUpdateOperationsInput | string | null
    bodyConditionScore?: NullableFloatFieldUpdateOperationsInput | number | null
    observations?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dewormingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dewormingExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dewormingName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    vaccineDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vaccineExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vaccineName?: NullableStringFieldUpdateOperationsInput | string | null
    offspringFromBull?: AnimalUncheckedUpdateManyWithoutBullNestedInput
    offspringFromMother?: AnimalUncheckedUpdateManyWithoutMotherNestedInput
    dewormings?: DewormingUncheckedUpdateManyWithoutAnimalNestedInput
    diseases?: DiseaseUncheckedUpdateManyWithoutAnimalNestedInput
    Notification?: NotificationUncheckedUpdateManyWithoutAnimalNestedInput
    vaccines?: VaccineUncheckedUpdateManyWithoutAnimalNestedInput
  }

  export type AnimalUpsertWithWhereUniqueWithoutFatherInput = {
    where: AnimalWhereUniqueInput
    update: XOR<AnimalUpdateWithoutFatherInput, AnimalUncheckedUpdateWithoutFatherInput>
    create: XOR<AnimalCreateWithoutFatherInput, AnimalUncheckedCreateWithoutFatherInput>
  }

  export type AnimalUpdateWithWhereUniqueWithoutFatherInput = {
    where: AnimalWhereUniqueInput
    data: XOR<AnimalUpdateWithoutFatherInput, AnimalUncheckedUpdateWithoutFatherInput>
  }

  export type AnimalUpdateManyWithWhereWithoutFatherInput = {
    where: AnimalScalarWhereInput
    data: XOR<AnimalUpdateManyMutationInput, AnimalUncheckedUpdateManyWithoutFatherInput>
  }

  export type AnimalUpsertWithoutOffspringFromMotherInput = {
    update: XOR<AnimalUpdateWithoutOffspringFromMotherInput, AnimalUncheckedUpdateWithoutOffspringFromMotherInput>
    create: XOR<AnimalCreateWithoutOffspringFromMotherInput, AnimalUncheckedCreateWithoutOffspringFromMotherInput>
    where?: AnimalWhereInput
  }

  export type AnimalUpdateToOneWithWhereWithoutOffspringFromMotherInput = {
    where?: AnimalWhereInput
    data: XOR<AnimalUpdateWithoutOffspringFromMotherInput, AnimalUncheckedUpdateWithoutOffspringFromMotherInput>
  }

  export type AnimalUpdateWithoutOffspringFromMotherInput = {
    id?: StringFieldUpdateOperationsInput | string
    manualId?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    weight?: FloatFieldUpdateOperationsInput | number
    breed?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    reproductiveStatus?: NullableStringFieldUpdateOperationsInput | string | null
    handlingType?: NullableStringFieldUpdateOperationsInput | string | null
    protocol?: NullableStringFieldUpdateOperationsInput | string | null
    andrological?: NullableStringFieldUpdateOperationsInput | string | null
    expectedDueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fetalGender?: NullableStringFieldUpdateOperationsInput | string | null
    bullIatf?: NullableStringFieldUpdateOperationsInput | string | null
    bodyConditionScore?: NullableFloatFieldUpdateOperationsInput | number | null
    observations?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dewormingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dewormingExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dewormingName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    vaccineDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vaccineExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vaccineName?: NullableStringFieldUpdateOperationsInput | string | null
    bull?: AnimalUpdateOneWithoutOffspringFromBullNestedInput
    offspringFromBull?: AnimalUpdateManyWithoutBullNestedInput
    father?: AnimalUpdateOneWithoutOffspringFromFatherNestedInput
    offspringFromFather?: AnimalUpdateManyWithoutFatherNestedInput
    mother?: AnimalUpdateOneWithoutOffspringFromMotherNestedInput
    owner?: UserUpdateOneRequiredWithoutAnimalsNestedInput
    dewormings?: DewormingUpdateManyWithoutAnimalNestedInput
    diseases?: DiseaseUpdateManyWithoutAnimalNestedInput
    Notification?: NotificationUpdateManyWithoutAnimalNestedInput
    vaccines?: VaccineUpdateManyWithoutAnimalNestedInput
  }

  export type AnimalUncheckedUpdateWithoutOffspringFromMotherInput = {
    id?: StringFieldUpdateOperationsInput | string
    manualId?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    weight?: FloatFieldUpdateOperationsInput | number
    breed?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    motherId?: NullableStringFieldUpdateOperationsInput | string | null
    fatherId?: NullableStringFieldUpdateOperationsInput | string | null
    reproductiveStatus?: NullableStringFieldUpdateOperationsInput | string | null
    handlingType?: NullableStringFieldUpdateOperationsInput | string | null
    bullId?: NullableStringFieldUpdateOperationsInput | string | null
    protocol?: NullableStringFieldUpdateOperationsInput | string | null
    andrological?: NullableStringFieldUpdateOperationsInput | string | null
    expectedDueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fetalGender?: NullableStringFieldUpdateOperationsInput | string | null
    bullIatf?: NullableStringFieldUpdateOperationsInput | string | null
    bodyConditionScore?: NullableFloatFieldUpdateOperationsInput | number | null
    observations?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dewormingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dewormingExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dewormingName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    vaccineDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vaccineExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vaccineName?: NullableStringFieldUpdateOperationsInput | string | null
    offspringFromBull?: AnimalUncheckedUpdateManyWithoutBullNestedInput
    offspringFromFather?: AnimalUncheckedUpdateManyWithoutFatherNestedInput
    dewormings?: DewormingUncheckedUpdateManyWithoutAnimalNestedInput
    diseases?: DiseaseUncheckedUpdateManyWithoutAnimalNestedInput
    Notification?: NotificationUncheckedUpdateManyWithoutAnimalNestedInput
    vaccines?: VaccineUncheckedUpdateManyWithoutAnimalNestedInput
  }

  export type AnimalUpsertWithWhereUniqueWithoutMotherInput = {
    where: AnimalWhereUniqueInput
    update: XOR<AnimalUpdateWithoutMotherInput, AnimalUncheckedUpdateWithoutMotherInput>
    create: XOR<AnimalCreateWithoutMotherInput, AnimalUncheckedCreateWithoutMotherInput>
  }

  export type AnimalUpdateWithWhereUniqueWithoutMotherInput = {
    where: AnimalWhereUniqueInput
    data: XOR<AnimalUpdateWithoutMotherInput, AnimalUncheckedUpdateWithoutMotherInput>
  }

  export type AnimalUpdateManyWithWhereWithoutMotherInput = {
    where: AnimalScalarWhereInput
    data: XOR<AnimalUpdateManyMutationInput, AnimalUncheckedUpdateManyWithoutMotherInput>
  }

  export type UserUpsertWithoutAnimalsInput = {
    update: XOR<UserUpdateWithoutAnimalsInput, UserUncheckedUpdateWithoutAnimalsInput>
    create: XOR<UserCreateWithoutAnimalsInput, UserUncheckedCreateWithoutAnimalsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAnimalsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAnimalsInput, UserUncheckedUpdateWithoutAnimalsInput>
  }

  export type UserUpdateWithoutAnimalsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUpdateManyWithoutUserNestedInput
    Authenticator?: AuthenticatorUpdateManyWithoutUserNestedInput
    Notification?: NotificationUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAnimalsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    Authenticator?: AuthenticatorUncheckedUpdateManyWithoutUserNestedInput
    Notification?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type DewormingUpsertWithWhereUniqueWithoutAnimalInput = {
    where: DewormingWhereUniqueInput
    update: XOR<DewormingUpdateWithoutAnimalInput, DewormingUncheckedUpdateWithoutAnimalInput>
    create: XOR<DewormingCreateWithoutAnimalInput, DewormingUncheckedCreateWithoutAnimalInput>
  }

  export type DewormingUpdateWithWhereUniqueWithoutAnimalInput = {
    where: DewormingWhereUniqueInput
    data: XOR<DewormingUpdateWithoutAnimalInput, DewormingUncheckedUpdateWithoutAnimalInput>
  }

  export type DewormingUpdateManyWithWhereWithoutAnimalInput = {
    where: DewormingScalarWhereInput
    data: XOR<DewormingUpdateManyMutationInput, DewormingUncheckedUpdateManyWithoutAnimalInput>
  }

  export type DewormingScalarWhereInput = {
    AND?: DewormingScalarWhereInput | DewormingScalarWhereInput[]
    OR?: DewormingScalarWhereInput[]
    NOT?: DewormingScalarWhereInput | DewormingScalarWhereInput[]
    id?: StringFilter<"Deworming"> | string
    name?: StringFilter<"Deworming"> | string
    date?: DateTimeFilter<"Deworming"> | Date | string
    animalId?: StringFilter<"Deworming"> | string
    createdAt?: DateTimeFilter<"Deworming"> | Date | string
    updatedAt?: DateTimeFilter<"Deworming"> | Date | string
  }

  export type DiseaseUpsertWithWhereUniqueWithoutAnimalInput = {
    where: DiseaseWhereUniqueInput
    update: XOR<DiseaseUpdateWithoutAnimalInput, DiseaseUncheckedUpdateWithoutAnimalInput>
    create: XOR<DiseaseCreateWithoutAnimalInput, DiseaseUncheckedCreateWithoutAnimalInput>
  }

  export type DiseaseUpdateWithWhereUniqueWithoutAnimalInput = {
    where: DiseaseWhereUniqueInput
    data: XOR<DiseaseUpdateWithoutAnimalInput, DiseaseUncheckedUpdateWithoutAnimalInput>
  }

  export type DiseaseUpdateManyWithWhereWithoutAnimalInput = {
    where: DiseaseScalarWhereInput
    data: XOR<DiseaseUpdateManyMutationInput, DiseaseUncheckedUpdateManyWithoutAnimalInput>
  }

  export type DiseaseScalarWhereInput = {
    AND?: DiseaseScalarWhereInput | DiseaseScalarWhereInput[]
    OR?: DiseaseScalarWhereInput[]
    NOT?: DiseaseScalarWhereInput | DiseaseScalarWhereInput[]
    id?: StringFilter<"Disease"> | string
    name?: StringFilter<"Disease"> | string
    description?: StringNullableFilter<"Disease"> | string | null
    date?: DateTimeFilter<"Disease"> | Date | string
    animalId?: StringFilter<"Disease"> | string
    createdAt?: DateTimeFilter<"Disease"> | Date | string
    updatedAt?: DateTimeFilter<"Disease"> | Date | string
  }

  export type NotificationUpsertWithWhereUniqueWithoutAnimalInput = {
    where: NotificationWhereUniqueInput
    update: XOR<NotificationUpdateWithoutAnimalInput, NotificationUncheckedUpdateWithoutAnimalInput>
    create: XOR<NotificationCreateWithoutAnimalInput, NotificationUncheckedCreateWithoutAnimalInput>
  }

  export type NotificationUpdateWithWhereUniqueWithoutAnimalInput = {
    where: NotificationWhereUniqueInput
    data: XOR<NotificationUpdateWithoutAnimalInput, NotificationUncheckedUpdateWithoutAnimalInput>
  }

  export type NotificationUpdateManyWithWhereWithoutAnimalInput = {
    where: NotificationScalarWhereInput
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyWithoutAnimalInput>
  }

  export type VaccineUpsertWithWhereUniqueWithoutAnimalInput = {
    where: VaccineWhereUniqueInput
    update: XOR<VaccineUpdateWithoutAnimalInput, VaccineUncheckedUpdateWithoutAnimalInput>
    create: XOR<VaccineCreateWithoutAnimalInput, VaccineUncheckedCreateWithoutAnimalInput>
  }

  export type VaccineUpdateWithWhereUniqueWithoutAnimalInput = {
    where: VaccineWhereUniqueInput
    data: XOR<VaccineUpdateWithoutAnimalInput, VaccineUncheckedUpdateWithoutAnimalInput>
  }

  export type VaccineUpdateManyWithWhereWithoutAnimalInput = {
    where: VaccineScalarWhereInput
    data: XOR<VaccineUpdateManyMutationInput, VaccineUncheckedUpdateManyWithoutAnimalInput>
  }

  export type VaccineScalarWhereInput = {
    AND?: VaccineScalarWhereInput | VaccineScalarWhereInput[]
    OR?: VaccineScalarWhereInput[]
    NOT?: VaccineScalarWhereInput | VaccineScalarWhereInput[]
    name?: StringFilter<"Vaccine"> | string
    description?: StringNullableFilter<"Vaccine"> | string | null
    date?: DateTimeFilter<"Vaccine"> | Date | string
    animalId?: StringFilter<"Vaccine"> | string
    createdAt?: DateTimeFilter<"Vaccine"> | Date | string
    updatedAt?: DateTimeFilter<"Vaccine"> | Date | string
    expiryDate?: DateTimeFilter<"Vaccine"> | Date | string
    id?: UuidFilter<"Vaccine"> | string
  }

  export type AnimalCreateWithoutDiseasesInput = {
    id?: string
    manualId: string
    gender: string
    birthDate: Date | string
    weight: number
    breed: string
    category?: string
    reproductiveStatus?: string | null
    handlingType?: string | null
    protocol?: string | null
    andrological?: string | null
    expectedDueDate?: Date | string | null
    fetalGender?: string | null
    bullIatf?: string | null
    bodyConditionScore?: number | null
    observations?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    dewormingDate?: Date | string | null
    dewormingExpiry?: Date | string | null
    dewormingName?: string | null
    status?: string
    vaccineDate?: Date | string | null
    vaccineExpiry?: Date | string | null
    vaccineName?: string | null
    bull?: AnimalCreateNestedOneWithoutOffspringFromBullInput
    offspringFromBull?: AnimalCreateNestedManyWithoutBullInput
    father?: AnimalCreateNestedOneWithoutOffspringFromFatherInput
    offspringFromFather?: AnimalCreateNestedManyWithoutFatherInput
    mother?: AnimalCreateNestedOneWithoutOffspringFromMotherInput
    offspringFromMother?: AnimalCreateNestedManyWithoutMotherInput
    owner: UserCreateNestedOneWithoutAnimalsInput
    dewormings?: DewormingCreateNestedManyWithoutAnimalInput
    Notification?: NotificationCreateNestedManyWithoutAnimalInput
    vaccines?: VaccineCreateNestedManyWithoutAnimalInput
  }

  export type AnimalUncheckedCreateWithoutDiseasesInput = {
    id?: string
    manualId: string
    gender: string
    birthDate: Date | string
    weight: number
    breed: string
    category?: string
    motherId?: string | null
    fatherId?: string | null
    reproductiveStatus?: string | null
    handlingType?: string | null
    bullId?: string | null
    protocol?: string | null
    andrological?: string | null
    expectedDueDate?: Date | string | null
    fetalGender?: string | null
    bullIatf?: string | null
    bodyConditionScore?: number | null
    observations?: string | null
    ownerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    dewormingDate?: Date | string | null
    dewormingExpiry?: Date | string | null
    dewormingName?: string | null
    status?: string
    vaccineDate?: Date | string | null
    vaccineExpiry?: Date | string | null
    vaccineName?: string | null
    offspringFromBull?: AnimalUncheckedCreateNestedManyWithoutBullInput
    offspringFromFather?: AnimalUncheckedCreateNestedManyWithoutFatherInput
    offspringFromMother?: AnimalUncheckedCreateNestedManyWithoutMotherInput
    dewormings?: DewormingUncheckedCreateNestedManyWithoutAnimalInput
    Notification?: NotificationUncheckedCreateNestedManyWithoutAnimalInput
    vaccines?: VaccineUncheckedCreateNestedManyWithoutAnimalInput
  }

  export type AnimalCreateOrConnectWithoutDiseasesInput = {
    where: AnimalWhereUniqueInput
    create: XOR<AnimalCreateWithoutDiseasesInput, AnimalUncheckedCreateWithoutDiseasesInput>
  }

  export type AnimalUpsertWithoutDiseasesInput = {
    update: XOR<AnimalUpdateWithoutDiseasesInput, AnimalUncheckedUpdateWithoutDiseasesInput>
    create: XOR<AnimalCreateWithoutDiseasesInput, AnimalUncheckedCreateWithoutDiseasesInput>
    where?: AnimalWhereInput
  }

  export type AnimalUpdateToOneWithWhereWithoutDiseasesInput = {
    where?: AnimalWhereInput
    data: XOR<AnimalUpdateWithoutDiseasesInput, AnimalUncheckedUpdateWithoutDiseasesInput>
  }

  export type AnimalUpdateWithoutDiseasesInput = {
    id?: StringFieldUpdateOperationsInput | string
    manualId?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    weight?: FloatFieldUpdateOperationsInput | number
    breed?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    reproductiveStatus?: NullableStringFieldUpdateOperationsInput | string | null
    handlingType?: NullableStringFieldUpdateOperationsInput | string | null
    protocol?: NullableStringFieldUpdateOperationsInput | string | null
    andrological?: NullableStringFieldUpdateOperationsInput | string | null
    expectedDueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fetalGender?: NullableStringFieldUpdateOperationsInput | string | null
    bullIatf?: NullableStringFieldUpdateOperationsInput | string | null
    bodyConditionScore?: NullableFloatFieldUpdateOperationsInput | number | null
    observations?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dewormingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dewormingExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dewormingName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    vaccineDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vaccineExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vaccineName?: NullableStringFieldUpdateOperationsInput | string | null
    bull?: AnimalUpdateOneWithoutOffspringFromBullNestedInput
    offspringFromBull?: AnimalUpdateManyWithoutBullNestedInput
    father?: AnimalUpdateOneWithoutOffspringFromFatherNestedInput
    offspringFromFather?: AnimalUpdateManyWithoutFatherNestedInput
    mother?: AnimalUpdateOneWithoutOffspringFromMotherNestedInput
    offspringFromMother?: AnimalUpdateManyWithoutMotherNestedInput
    owner?: UserUpdateOneRequiredWithoutAnimalsNestedInput
    dewormings?: DewormingUpdateManyWithoutAnimalNestedInput
    Notification?: NotificationUpdateManyWithoutAnimalNestedInput
    vaccines?: VaccineUpdateManyWithoutAnimalNestedInput
  }

  export type AnimalUncheckedUpdateWithoutDiseasesInput = {
    id?: StringFieldUpdateOperationsInput | string
    manualId?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    weight?: FloatFieldUpdateOperationsInput | number
    breed?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    motherId?: NullableStringFieldUpdateOperationsInput | string | null
    fatherId?: NullableStringFieldUpdateOperationsInput | string | null
    reproductiveStatus?: NullableStringFieldUpdateOperationsInput | string | null
    handlingType?: NullableStringFieldUpdateOperationsInput | string | null
    bullId?: NullableStringFieldUpdateOperationsInput | string | null
    protocol?: NullableStringFieldUpdateOperationsInput | string | null
    andrological?: NullableStringFieldUpdateOperationsInput | string | null
    expectedDueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fetalGender?: NullableStringFieldUpdateOperationsInput | string | null
    bullIatf?: NullableStringFieldUpdateOperationsInput | string | null
    bodyConditionScore?: NullableFloatFieldUpdateOperationsInput | number | null
    observations?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dewormingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dewormingExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dewormingName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    vaccineDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vaccineExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vaccineName?: NullableStringFieldUpdateOperationsInput | string | null
    offspringFromBull?: AnimalUncheckedUpdateManyWithoutBullNestedInput
    offspringFromFather?: AnimalUncheckedUpdateManyWithoutFatherNestedInput
    offspringFromMother?: AnimalUncheckedUpdateManyWithoutMotherNestedInput
    dewormings?: DewormingUncheckedUpdateManyWithoutAnimalNestedInput
    Notification?: NotificationUncheckedUpdateManyWithoutAnimalNestedInput
    vaccines?: VaccineUncheckedUpdateManyWithoutAnimalNestedInput
  }

  export type AnimalCreateWithoutVaccinesInput = {
    id?: string
    manualId: string
    gender: string
    birthDate: Date | string
    weight: number
    breed: string
    category?: string
    reproductiveStatus?: string | null
    handlingType?: string | null
    protocol?: string | null
    andrological?: string | null
    expectedDueDate?: Date | string | null
    fetalGender?: string | null
    bullIatf?: string | null
    bodyConditionScore?: number | null
    observations?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    dewormingDate?: Date | string | null
    dewormingExpiry?: Date | string | null
    dewormingName?: string | null
    status?: string
    vaccineDate?: Date | string | null
    vaccineExpiry?: Date | string | null
    vaccineName?: string | null
    bull?: AnimalCreateNestedOneWithoutOffspringFromBullInput
    offspringFromBull?: AnimalCreateNestedManyWithoutBullInput
    father?: AnimalCreateNestedOneWithoutOffspringFromFatherInput
    offspringFromFather?: AnimalCreateNestedManyWithoutFatherInput
    mother?: AnimalCreateNestedOneWithoutOffspringFromMotherInput
    offspringFromMother?: AnimalCreateNestedManyWithoutMotherInput
    owner: UserCreateNestedOneWithoutAnimalsInput
    dewormings?: DewormingCreateNestedManyWithoutAnimalInput
    diseases?: DiseaseCreateNestedManyWithoutAnimalInput
    Notification?: NotificationCreateNestedManyWithoutAnimalInput
  }

  export type AnimalUncheckedCreateWithoutVaccinesInput = {
    id?: string
    manualId: string
    gender: string
    birthDate: Date | string
    weight: number
    breed: string
    category?: string
    motherId?: string | null
    fatherId?: string | null
    reproductiveStatus?: string | null
    handlingType?: string | null
    bullId?: string | null
    protocol?: string | null
    andrological?: string | null
    expectedDueDate?: Date | string | null
    fetalGender?: string | null
    bullIatf?: string | null
    bodyConditionScore?: number | null
    observations?: string | null
    ownerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    dewormingDate?: Date | string | null
    dewormingExpiry?: Date | string | null
    dewormingName?: string | null
    status?: string
    vaccineDate?: Date | string | null
    vaccineExpiry?: Date | string | null
    vaccineName?: string | null
    offspringFromBull?: AnimalUncheckedCreateNestedManyWithoutBullInput
    offspringFromFather?: AnimalUncheckedCreateNestedManyWithoutFatherInput
    offspringFromMother?: AnimalUncheckedCreateNestedManyWithoutMotherInput
    dewormings?: DewormingUncheckedCreateNestedManyWithoutAnimalInput
    diseases?: DiseaseUncheckedCreateNestedManyWithoutAnimalInput
    Notification?: NotificationUncheckedCreateNestedManyWithoutAnimalInput
  }

  export type AnimalCreateOrConnectWithoutVaccinesInput = {
    where: AnimalWhereUniqueInput
    create: XOR<AnimalCreateWithoutVaccinesInput, AnimalUncheckedCreateWithoutVaccinesInput>
  }

  export type AnimalUpsertWithoutVaccinesInput = {
    update: XOR<AnimalUpdateWithoutVaccinesInput, AnimalUncheckedUpdateWithoutVaccinesInput>
    create: XOR<AnimalCreateWithoutVaccinesInput, AnimalUncheckedCreateWithoutVaccinesInput>
    where?: AnimalWhereInput
  }

  export type AnimalUpdateToOneWithWhereWithoutVaccinesInput = {
    where?: AnimalWhereInput
    data: XOR<AnimalUpdateWithoutVaccinesInput, AnimalUncheckedUpdateWithoutVaccinesInput>
  }

  export type AnimalUpdateWithoutVaccinesInput = {
    id?: StringFieldUpdateOperationsInput | string
    manualId?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    weight?: FloatFieldUpdateOperationsInput | number
    breed?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    reproductiveStatus?: NullableStringFieldUpdateOperationsInput | string | null
    handlingType?: NullableStringFieldUpdateOperationsInput | string | null
    protocol?: NullableStringFieldUpdateOperationsInput | string | null
    andrological?: NullableStringFieldUpdateOperationsInput | string | null
    expectedDueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fetalGender?: NullableStringFieldUpdateOperationsInput | string | null
    bullIatf?: NullableStringFieldUpdateOperationsInput | string | null
    bodyConditionScore?: NullableFloatFieldUpdateOperationsInput | number | null
    observations?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dewormingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dewormingExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dewormingName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    vaccineDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vaccineExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vaccineName?: NullableStringFieldUpdateOperationsInput | string | null
    bull?: AnimalUpdateOneWithoutOffspringFromBullNestedInput
    offspringFromBull?: AnimalUpdateManyWithoutBullNestedInput
    father?: AnimalUpdateOneWithoutOffspringFromFatherNestedInput
    offspringFromFather?: AnimalUpdateManyWithoutFatherNestedInput
    mother?: AnimalUpdateOneWithoutOffspringFromMotherNestedInput
    offspringFromMother?: AnimalUpdateManyWithoutMotherNestedInput
    owner?: UserUpdateOneRequiredWithoutAnimalsNestedInput
    dewormings?: DewormingUpdateManyWithoutAnimalNestedInput
    diseases?: DiseaseUpdateManyWithoutAnimalNestedInput
    Notification?: NotificationUpdateManyWithoutAnimalNestedInput
  }

  export type AnimalUncheckedUpdateWithoutVaccinesInput = {
    id?: StringFieldUpdateOperationsInput | string
    manualId?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    weight?: FloatFieldUpdateOperationsInput | number
    breed?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    motherId?: NullableStringFieldUpdateOperationsInput | string | null
    fatherId?: NullableStringFieldUpdateOperationsInput | string | null
    reproductiveStatus?: NullableStringFieldUpdateOperationsInput | string | null
    handlingType?: NullableStringFieldUpdateOperationsInput | string | null
    bullId?: NullableStringFieldUpdateOperationsInput | string | null
    protocol?: NullableStringFieldUpdateOperationsInput | string | null
    andrological?: NullableStringFieldUpdateOperationsInput | string | null
    expectedDueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fetalGender?: NullableStringFieldUpdateOperationsInput | string | null
    bullIatf?: NullableStringFieldUpdateOperationsInput | string | null
    bodyConditionScore?: NullableFloatFieldUpdateOperationsInput | number | null
    observations?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dewormingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dewormingExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dewormingName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    vaccineDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vaccineExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vaccineName?: NullableStringFieldUpdateOperationsInput | string | null
    offspringFromBull?: AnimalUncheckedUpdateManyWithoutBullNestedInput
    offspringFromFather?: AnimalUncheckedUpdateManyWithoutFatherNestedInput
    offspringFromMother?: AnimalUncheckedUpdateManyWithoutMotherNestedInput
    dewormings?: DewormingUncheckedUpdateManyWithoutAnimalNestedInput
    diseases?: DiseaseUncheckedUpdateManyWithoutAnimalNestedInput
    Notification?: NotificationUncheckedUpdateManyWithoutAnimalNestedInput
  }

  export type AnimalCreateWithoutDewormingsInput = {
    id?: string
    manualId: string
    gender: string
    birthDate: Date | string
    weight: number
    breed: string
    category?: string
    reproductiveStatus?: string | null
    handlingType?: string | null
    protocol?: string | null
    andrological?: string | null
    expectedDueDate?: Date | string | null
    fetalGender?: string | null
    bullIatf?: string | null
    bodyConditionScore?: number | null
    observations?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    dewormingDate?: Date | string | null
    dewormingExpiry?: Date | string | null
    dewormingName?: string | null
    status?: string
    vaccineDate?: Date | string | null
    vaccineExpiry?: Date | string | null
    vaccineName?: string | null
    bull?: AnimalCreateNestedOneWithoutOffspringFromBullInput
    offspringFromBull?: AnimalCreateNestedManyWithoutBullInput
    father?: AnimalCreateNestedOneWithoutOffspringFromFatherInput
    offspringFromFather?: AnimalCreateNestedManyWithoutFatherInput
    mother?: AnimalCreateNestedOneWithoutOffspringFromMotherInput
    offspringFromMother?: AnimalCreateNestedManyWithoutMotherInput
    owner: UserCreateNestedOneWithoutAnimalsInput
    diseases?: DiseaseCreateNestedManyWithoutAnimalInput
    Notification?: NotificationCreateNestedManyWithoutAnimalInput
    vaccines?: VaccineCreateNestedManyWithoutAnimalInput
  }

  export type AnimalUncheckedCreateWithoutDewormingsInput = {
    id?: string
    manualId: string
    gender: string
    birthDate: Date | string
    weight: number
    breed: string
    category?: string
    motherId?: string | null
    fatherId?: string | null
    reproductiveStatus?: string | null
    handlingType?: string | null
    bullId?: string | null
    protocol?: string | null
    andrological?: string | null
    expectedDueDate?: Date | string | null
    fetalGender?: string | null
    bullIatf?: string | null
    bodyConditionScore?: number | null
    observations?: string | null
    ownerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    dewormingDate?: Date | string | null
    dewormingExpiry?: Date | string | null
    dewormingName?: string | null
    status?: string
    vaccineDate?: Date | string | null
    vaccineExpiry?: Date | string | null
    vaccineName?: string | null
    offspringFromBull?: AnimalUncheckedCreateNestedManyWithoutBullInput
    offspringFromFather?: AnimalUncheckedCreateNestedManyWithoutFatherInput
    offspringFromMother?: AnimalUncheckedCreateNestedManyWithoutMotherInput
    diseases?: DiseaseUncheckedCreateNestedManyWithoutAnimalInput
    Notification?: NotificationUncheckedCreateNestedManyWithoutAnimalInput
    vaccines?: VaccineUncheckedCreateNestedManyWithoutAnimalInput
  }

  export type AnimalCreateOrConnectWithoutDewormingsInput = {
    where: AnimalWhereUniqueInput
    create: XOR<AnimalCreateWithoutDewormingsInput, AnimalUncheckedCreateWithoutDewormingsInput>
  }

  export type AnimalUpsertWithoutDewormingsInput = {
    update: XOR<AnimalUpdateWithoutDewormingsInput, AnimalUncheckedUpdateWithoutDewormingsInput>
    create: XOR<AnimalCreateWithoutDewormingsInput, AnimalUncheckedCreateWithoutDewormingsInput>
    where?: AnimalWhereInput
  }

  export type AnimalUpdateToOneWithWhereWithoutDewormingsInput = {
    where?: AnimalWhereInput
    data: XOR<AnimalUpdateWithoutDewormingsInput, AnimalUncheckedUpdateWithoutDewormingsInput>
  }

  export type AnimalUpdateWithoutDewormingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    manualId?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    weight?: FloatFieldUpdateOperationsInput | number
    breed?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    reproductiveStatus?: NullableStringFieldUpdateOperationsInput | string | null
    handlingType?: NullableStringFieldUpdateOperationsInput | string | null
    protocol?: NullableStringFieldUpdateOperationsInput | string | null
    andrological?: NullableStringFieldUpdateOperationsInput | string | null
    expectedDueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fetalGender?: NullableStringFieldUpdateOperationsInput | string | null
    bullIatf?: NullableStringFieldUpdateOperationsInput | string | null
    bodyConditionScore?: NullableFloatFieldUpdateOperationsInput | number | null
    observations?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dewormingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dewormingExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dewormingName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    vaccineDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vaccineExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vaccineName?: NullableStringFieldUpdateOperationsInput | string | null
    bull?: AnimalUpdateOneWithoutOffspringFromBullNestedInput
    offspringFromBull?: AnimalUpdateManyWithoutBullNestedInput
    father?: AnimalUpdateOneWithoutOffspringFromFatherNestedInput
    offspringFromFather?: AnimalUpdateManyWithoutFatherNestedInput
    mother?: AnimalUpdateOneWithoutOffspringFromMotherNestedInput
    offspringFromMother?: AnimalUpdateManyWithoutMotherNestedInput
    owner?: UserUpdateOneRequiredWithoutAnimalsNestedInput
    diseases?: DiseaseUpdateManyWithoutAnimalNestedInput
    Notification?: NotificationUpdateManyWithoutAnimalNestedInput
    vaccines?: VaccineUpdateManyWithoutAnimalNestedInput
  }

  export type AnimalUncheckedUpdateWithoutDewormingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    manualId?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    weight?: FloatFieldUpdateOperationsInput | number
    breed?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    motherId?: NullableStringFieldUpdateOperationsInput | string | null
    fatherId?: NullableStringFieldUpdateOperationsInput | string | null
    reproductiveStatus?: NullableStringFieldUpdateOperationsInput | string | null
    handlingType?: NullableStringFieldUpdateOperationsInput | string | null
    bullId?: NullableStringFieldUpdateOperationsInput | string | null
    protocol?: NullableStringFieldUpdateOperationsInput | string | null
    andrological?: NullableStringFieldUpdateOperationsInput | string | null
    expectedDueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fetalGender?: NullableStringFieldUpdateOperationsInput | string | null
    bullIatf?: NullableStringFieldUpdateOperationsInput | string | null
    bodyConditionScore?: NullableFloatFieldUpdateOperationsInput | number | null
    observations?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dewormingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dewormingExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dewormingName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    vaccineDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vaccineExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vaccineName?: NullableStringFieldUpdateOperationsInput | string | null
    offspringFromBull?: AnimalUncheckedUpdateManyWithoutBullNestedInput
    offspringFromFather?: AnimalUncheckedUpdateManyWithoutFatherNestedInput
    offspringFromMother?: AnimalUncheckedUpdateManyWithoutMotherNestedInput
    diseases?: DiseaseUncheckedUpdateManyWithoutAnimalNestedInput
    Notification?: NotificationUncheckedUpdateManyWithoutAnimalNestedInput
    vaccines?: VaccineUncheckedUpdateManyWithoutAnimalNestedInput
  }

  export type UserCreateWithoutAccountsInput = {
    id?: string
    name: string
    email: string
    cnpj?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    emailVerified?: Date | string | null
    image?: string | null
    animals?: AnimalCreateNestedManyWithoutOwnerInput
    Authenticator?: AuthenticatorCreateNestedManyWithoutUserInput
    Notification?: NotificationCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAccountsInput = {
    id?: string
    name: string
    email: string
    cnpj?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    emailVerified?: Date | string | null
    image?: string | null
    animals?: AnimalUncheckedCreateNestedManyWithoutOwnerInput
    Authenticator?: AuthenticatorUncheckedCreateNestedManyWithoutUserInput
    Notification?: NotificationUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAccountsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
  }

  export type UserUpsertWithoutAccountsInput = {
    update: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAccountsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    animals?: AnimalUpdateManyWithoutOwnerNestedInput
    Authenticator?: AuthenticatorUpdateManyWithoutUserNestedInput
    Notification?: NotificationUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    animals?: AnimalUncheckedUpdateManyWithoutOwnerNestedInput
    Authenticator?: AuthenticatorUncheckedUpdateManyWithoutUserNestedInput
    Notification?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutSessionsInput = {
    id?: string
    name: string
    email: string
    cnpj?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    emailVerified?: Date | string | null
    image?: string | null
    accounts?: AccountCreateNestedManyWithoutUserInput
    animals?: AnimalCreateNestedManyWithoutOwnerInput
    Authenticator?: AuthenticatorCreateNestedManyWithoutUserInput
    Notification?: NotificationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    id?: string
    name: string
    email: string
    cnpj?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    emailVerified?: Date | string | null
    image?: string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    animals?: AnimalUncheckedCreateNestedManyWithoutOwnerInput
    Authenticator?: AuthenticatorUncheckedCreateNestedManyWithoutUserInput
    Notification?: NotificationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUpdateManyWithoutUserNestedInput
    animals?: AnimalUpdateManyWithoutOwnerNestedInput
    Authenticator?: AuthenticatorUpdateManyWithoutUserNestedInput
    Notification?: NotificationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    animals?: AnimalUncheckedUpdateManyWithoutOwnerNestedInput
    Authenticator?: AuthenticatorUncheckedUpdateManyWithoutUserNestedInput
    Notification?: NotificationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutAuthenticatorInput = {
    id?: string
    name: string
    email: string
    cnpj?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    emailVerified?: Date | string | null
    image?: string | null
    accounts?: AccountCreateNestedManyWithoutUserInput
    animals?: AnimalCreateNestedManyWithoutOwnerInput
    Notification?: NotificationCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAuthenticatorInput = {
    id?: string
    name: string
    email: string
    cnpj?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    emailVerified?: Date | string | null
    image?: string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    animals?: AnimalUncheckedCreateNestedManyWithoutOwnerInput
    Notification?: NotificationUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAuthenticatorInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAuthenticatorInput, UserUncheckedCreateWithoutAuthenticatorInput>
  }

  export type UserUpsertWithoutAuthenticatorInput = {
    update: XOR<UserUpdateWithoutAuthenticatorInput, UserUncheckedUpdateWithoutAuthenticatorInput>
    create: XOR<UserCreateWithoutAuthenticatorInput, UserUncheckedCreateWithoutAuthenticatorInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAuthenticatorInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAuthenticatorInput, UserUncheckedUpdateWithoutAuthenticatorInput>
  }

  export type UserUpdateWithoutAuthenticatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUpdateManyWithoutUserNestedInput
    animals?: AnimalUpdateManyWithoutOwnerNestedInput
    Notification?: NotificationUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAuthenticatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    animals?: AnimalUncheckedUpdateManyWithoutOwnerNestedInput
    Notification?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type AnimalCreateWithoutNotificationInput = {
    id?: string
    manualId: string
    gender: string
    birthDate: Date | string
    weight: number
    breed: string
    category?: string
    reproductiveStatus?: string | null
    handlingType?: string | null
    protocol?: string | null
    andrological?: string | null
    expectedDueDate?: Date | string | null
    fetalGender?: string | null
    bullIatf?: string | null
    bodyConditionScore?: number | null
    observations?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    dewormingDate?: Date | string | null
    dewormingExpiry?: Date | string | null
    dewormingName?: string | null
    status?: string
    vaccineDate?: Date | string | null
    vaccineExpiry?: Date | string | null
    vaccineName?: string | null
    bull?: AnimalCreateNestedOneWithoutOffspringFromBullInput
    offspringFromBull?: AnimalCreateNestedManyWithoutBullInput
    father?: AnimalCreateNestedOneWithoutOffspringFromFatherInput
    offspringFromFather?: AnimalCreateNestedManyWithoutFatherInput
    mother?: AnimalCreateNestedOneWithoutOffspringFromMotherInput
    offspringFromMother?: AnimalCreateNestedManyWithoutMotherInput
    owner: UserCreateNestedOneWithoutAnimalsInput
    dewormings?: DewormingCreateNestedManyWithoutAnimalInput
    diseases?: DiseaseCreateNestedManyWithoutAnimalInput
    vaccines?: VaccineCreateNestedManyWithoutAnimalInput
  }

  export type AnimalUncheckedCreateWithoutNotificationInput = {
    id?: string
    manualId: string
    gender: string
    birthDate: Date | string
    weight: number
    breed: string
    category?: string
    motherId?: string | null
    fatherId?: string | null
    reproductiveStatus?: string | null
    handlingType?: string | null
    bullId?: string | null
    protocol?: string | null
    andrological?: string | null
    expectedDueDate?: Date | string | null
    fetalGender?: string | null
    bullIatf?: string | null
    bodyConditionScore?: number | null
    observations?: string | null
    ownerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    dewormingDate?: Date | string | null
    dewormingExpiry?: Date | string | null
    dewormingName?: string | null
    status?: string
    vaccineDate?: Date | string | null
    vaccineExpiry?: Date | string | null
    vaccineName?: string | null
    offspringFromBull?: AnimalUncheckedCreateNestedManyWithoutBullInput
    offspringFromFather?: AnimalUncheckedCreateNestedManyWithoutFatherInput
    offspringFromMother?: AnimalUncheckedCreateNestedManyWithoutMotherInput
    dewormings?: DewormingUncheckedCreateNestedManyWithoutAnimalInput
    diseases?: DiseaseUncheckedCreateNestedManyWithoutAnimalInput
    vaccines?: VaccineUncheckedCreateNestedManyWithoutAnimalInput
  }

  export type AnimalCreateOrConnectWithoutNotificationInput = {
    where: AnimalWhereUniqueInput
    create: XOR<AnimalCreateWithoutNotificationInput, AnimalUncheckedCreateWithoutNotificationInput>
  }

  export type UserCreateWithoutNotificationInput = {
    id?: string
    name: string
    email: string
    cnpj?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    emailVerified?: Date | string | null
    image?: string | null
    accounts?: AccountCreateNestedManyWithoutUserInput
    animals?: AnimalCreateNestedManyWithoutOwnerInput
    Authenticator?: AuthenticatorCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutNotificationInput = {
    id?: string
    name: string
    email: string
    cnpj?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    emailVerified?: Date | string | null
    image?: string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    animals?: AnimalUncheckedCreateNestedManyWithoutOwnerInput
    Authenticator?: AuthenticatorUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutNotificationInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutNotificationInput, UserUncheckedCreateWithoutNotificationInput>
  }

  export type AnimalUpsertWithoutNotificationInput = {
    update: XOR<AnimalUpdateWithoutNotificationInput, AnimalUncheckedUpdateWithoutNotificationInput>
    create: XOR<AnimalCreateWithoutNotificationInput, AnimalUncheckedCreateWithoutNotificationInput>
    where?: AnimalWhereInput
  }

  export type AnimalUpdateToOneWithWhereWithoutNotificationInput = {
    where?: AnimalWhereInput
    data: XOR<AnimalUpdateWithoutNotificationInput, AnimalUncheckedUpdateWithoutNotificationInput>
  }

  export type AnimalUpdateWithoutNotificationInput = {
    id?: StringFieldUpdateOperationsInput | string
    manualId?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    weight?: FloatFieldUpdateOperationsInput | number
    breed?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    reproductiveStatus?: NullableStringFieldUpdateOperationsInput | string | null
    handlingType?: NullableStringFieldUpdateOperationsInput | string | null
    protocol?: NullableStringFieldUpdateOperationsInput | string | null
    andrological?: NullableStringFieldUpdateOperationsInput | string | null
    expectedDueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fetalGender?: NullableStringFieldUpdateOperationsInput | string | null
    bullIatf?: NullableStringFieldUpdateOperationsInput | string | null
    bodyConditionScore?: NullableFloatFieldUpdateOperationsInput | number | null
    observations?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dewormingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dewormingExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dewormingName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    vaccineDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vaccineExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vaccineName?: NullableStringFieldUpdateOperationsInput | string | null
    bull?: AnimalUpdateOneWithoutOffspringFromBullNestedInput
    offspringFromBull?: AnimalUpdateManyWithoutBullNestedInput
    father?: AnimalUpdateOneWithoutOffspringFromFatherNestedInput
    offspringFromFather?: AnimalUpdateManyWithoutFatherNestedInput
    mother?: AnimalUpdateOneWithoutOffspringFromMotherNestedInput
    offspringFromMother?: AnimalUpdateManyWithoutMotherNestedInput
    owner?: UserUpdateOneRequiredWithoutAnimalsNestedInput
    dewormings?: DewormingUpdateManyWithoutAnimalNestedInput
    diseases?: DiseaseUpdateManyWithoutAnimalNestedInput
    vaccines?: VaccineUpdateManyWithoutAnimalNestedInput
  }

  export type AnimalUncheckedUpdateWithoutNotificationInput = {
    id?: StringFieldUpdateOperationsInput | string
    manualId?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    weight?: FloatFieldUpdateOperationsInput | number
    breed?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    motherId?: NullableStringFieldUpdateOperationsInput | string | null
    fatherId?: NullableStringFieldUpdateOperationsInput | string | null
    reproductiveStatus?: NullableStringFieldUpdateOperationsInput | string | null
    handlingType?: NullableStringFieldUpdateOperationsInput | string | null
    bullId?: NullableStringFieldUpdateOperationsInput | string | null
    protocol?: NullableStringFieldUpdateOperationsInput | string | null
    andrological?: NullableStringFieldUpdateOperationsInput | string | null
    expectedDueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fetalGender?: NullableStringFieldUpdateOperationsInput | string | null
    bullIatf?: NullableStringFieldUpdateOperationsInput | string | null
    bodyConditionScore?: NullableFloatFieldUpdateOperationsInput | number | null
    observations?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dewormingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dewormingExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dewormingName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    vaccineDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vaccineExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vaccineName?: NullableStringFieldUpdateOperationsInput | string | null
    offspringFromBull?: AnimalUncheckedUpdateManyWithoutBullNestedInput
    offspringFromFather?: AnimalUncheckedUpdateManyWithoutFatherNestedInput
    offspringFromMother?: AnimalUncheckedUpdateManyWithoutMotherNestedInput
    dewormings?: DewormingUncheckedUpdateManyWithoutAnimalNestedInput
    diseases?: DiseaseUncheckedUpdateManyWithoutAnimalNestedInput
    vaccines?: VaccineUncheckedUpdateManyWithoutAnimalNestedInput
  }

  export type UserUpsertWithoutNotificationInput = {
    update: XOR<UserUpdateWithoutNotificationInput, UserUncheckedUpdateWithoutNotificationInput>
    create: XOR<UserCreateWithoutNotificationInput, UserUncheckedCreateWithoutNotificationInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutNotificationInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutNotificationInput, UserUncheckedUpdateWithoutNotificationInput>
  }

  export type UserUpdateWithoutNotificationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUpdateManyWithoutUserNestedInput
    animals?: AnimalUpdateManyWithoutOwnerNestedInput
    Authenticator?: AuthenticatorUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutNotificationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    animals?: AnimalUncheckedUpdateManyWithoutOwnerNestedInput
    Authenticator?: AuthenticatorUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type AccountCreateManyUserInput = {
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AnimalCreateManyOwnerInput = {
    id?: string
    manualId: string
    gender: string
    birthDate: Date | string
    weight: number
    breed: string
    category?: string
    motherId?: string | null
    fatherId?: string | null
    reproductiveStatus?: string | null
    handlingType?: string | null
    bullId?: string | null
    protocol?: string | null
    andrological?: string | null
    expectedDueDate?: Date | string | null
    fetalGender?: string | null
    bullIatf?: string | null
    bodyConditionScore?: number | null
    observations?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    dewormingDate?: Date | string | null
    dewormingExpiry?: Date | string | null
    dewormingName?: string | null
    status?: string
    vaccineDate?: Date | string | null
    vaccineExpiry?: Date | string | null
    vaccineName?: string | null
  }

  export type AuthenticatorCreateManyUserInput = {
    credentialID: string
    providerAccountId: string
    credentialPublicKey: string
    counter: number
    credentialDeviceType: string
    credentialBackedUp: boolean
    transports?: string | null
  }

  export type NotificationCreateManyUserInput = {
    id?: string
    message: string
    notifyAt: Date | string
    read?: boolean
    animalId: string
    createdAt?: Date | string
  }

  export type SessionCreateManyUserInput = {
    sessionToken: string
    expires: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUpdateWithoutUserInput = {
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateWithoutUserInput = {
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateManyWithoutUserInput = {
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnimalUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    manualId?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    weight?: FloatFieldUpdateOperationsInput | number
    breed?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    reproductiveStatus?: NullableStringFieldUpdateOperationsInput | string | null
    handlingType?: NullableStringFieldUpdateOperationsInput | string | null
    protocol?: NullableStringFieldUpdateOperationsInput | string | null
    andrological?: NullableStringFieldUpdateOperationsInput | string | null
    expectedDueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fetalGender?: NullableStringFieldUpdateOperationsInput | string | null
    bullIatf?: NullableStringFieldUpdateOperationsInput | string | null
    bodyConditionScore?: NullableFloatFieldUpdateOperationsInput | number | null
    observations?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dewormingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dewormingExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dewormingName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    vaccineDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vaccineExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vaccineName?: NullableStringFieldUpdateOperationsInput | string | null
    bull?: AnimalUpdateOneWithoutOffspringFromBullNestedInput
    offspringFromBull?: AnimalUpdateManyWithoutBullNestedInput
    father?: AnimalUpdateOneWithoutOffspringFromFatherNestedInput
    offspringFromFather?: AnimalUpdateManyWithoutFatherNestedInput
    mother?: AnimalUpdateOneWithoutOffspringFromMotherNestedInput
    offspringFromMother?: AnimalUpdateManyWithoutMotherNestedInput
    dewormings?: DewormingUpdateManyWithoutAnimalNestedInput
    diseases?: DiseaseUpdateManyWithoutAnimalNestedInput
    Notification?: NotificationUpdateManyWithoutAnimalNestedInput
    vaccines?: VaccineUpdateManyWithoutAnimalNestedInput
  }

  export type AnimalUncheckedUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    manualId?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    weight?: FloatFieldUpdateOperationsInput | number
    breed?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    motherId?: NullableStringFieldUpdateOperationsInput | string | null
    fatherId?: NullableStringFieldUpdateOperationsInput | string | null
    reproductiveStatus?: NullableStringFieldUpdateOperationsInput | string | null
    handlingType?: NullableStringFieldUpdateOperationsInput | string | null
    bullId?: NullableStringFieldUpdateOperationsInput | string | null
    protocol?: NullableStringFieldUpdateOperationsInput | string | null
    andrological?: NullableStringFieldUpdateOperationsInput | string | null
    expectedDueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fetalGender?: NullableStringFieldUpdateOperationsInput | string | null
    bullIatf?: NullableStringFieldUpdateOperationsInput | string | null
    bodyConditionScore?: NullableFloatFieldUpdateOperationsInput | number | null
    observations?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dewormingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dewormingExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dewormingName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    vaccineDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vaccineExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vaccineName?: NullableStringFieldUpdateOperationsInput | string | null
    offspringFromBull?: AnimalUncheckedUpdateManyWithoutBullNestedInput
    offspringFromFather?: AnimalUncheckedUpdateManyWithoutFatherNestedInput
    offspringFromMother?: AnimalUncheckedUpdateManyWithoutMotherNestedInput
    dewormings?: DewormingUncheckedUpdateManyWithoutAnimalNestedInput
    diseases?: DiseaseUncheckedUpdateManyWithoutAnimalNestedInput
    Notification?: NotificationUncheckedUpdateManyWithoutAnimalNestedInput
    vaccines?: VaccineUncheckedUpdateManyWithoutAnimalNestedInput
  }

  export type AnimalUncheckedUpdateManyWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    manualId?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    weight?: FloatFieldUpdateOperationsInput | number
    breed?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    motherId?: NullableStringFieldUpdateOperationsInput | string | null
    fatherId?: NullableStringFieldUpdateOperationsInput | string | null
    reproductiveStatus?: NullableStringFieldUpdateOperationsInput | string | null
    handlingType?: NullableStringFieldUpdateOperationsInput | string | null
    bullId?: NullableStringFieldUpdateOperationsInput | string | null
    protocol?: NullableStringFieldUpdateOperationsInput | string | null
    andrological?: NullableStringFieldUpdateOperationsInput | string | null
    expectedDueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fetalGender?: NullableStringFieldUpdateOperationsInput | string | null
    bullIatf?: NullableStringFieldUpdateOperationsInput | string | null
    bodyConditionScore?: NullableFloatFieldUpdateOperationsInput | number | null
    observations?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dewormingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dewormingExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dewormingName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    vaccineDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vaccineExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vaccineName?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AuthenticatorUpdateWithoutUserInput = {
    credentialID?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    credentialPublicKey?: StringFieldUpdateOperationsInput | string
    counter?: IntFieldUpdateOperationsInput | number
    credentialDeviceType?: StringFieldUpdateOperationsInput | string
    credentialBackedUp?: BoolFieldUpdateOperationsInput | boolean
    transports?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AuthenticatorUncheckedUpdateWithoutUserInput = {
    credentialID?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    credentialPublicKey?: StringFieldUpdateOperationsInput | string
    counter?: IntFieldUpdateOperationsInput | number
    credentialDeviceType?: StringFieldUpdateOperationsInput | string
    credentialBackedUp?: BoolFieldUpdateOperationsInput | boolean
    transports?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AuthenticatorUncheckedUpdateManyWithoutUserInput = {
    credentialID?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    credentialPublicKey?: StringFieldUpdateOperationsInput | string
    counter?: IntFieldUpdateOperationsInput | number
    credentialDeviceType?: StringFieldUpdateOperationsInput | string
    credentialBackedUp?: BoolFieldUpdateOperationsInput | boolean
    transports?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type NotificationUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    notifyAt?: DateTimeFieldUpdateOperationsInput | Date | string
    read?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Animal?: AnimalUpdateOneRequiredWithoutNotificationNestedInput
  }

  export type NotificationUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    notifyAt?: DateTimeFieldUpdateOperationsInput | Date | string
    read?: BoolFieldUpdateOperationsInput | boolean
    animalId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    notifyAt?: DateTimeFieldUpdateOperationsInput | Date | string
    read?: BoolFieldUpdateOperationsInput | boolean
    animalId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUpdateWithoutUserInput = {
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateWithoutUserInput = {
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyWithoutUserInput = {
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnimalCreateManyBullInput = {
    id?: string
    manualId: string
    gender: string
    birthDate: Date | string
    weight: number
    breed: string
    category?: string
    motherId?: string | null
    fatherId?: string | null
    reproductiveStatus?: string | null
    handlingType?: string | null
    protocol?: string | null
    andrological?: string | null
    expectedDueDate?: Date | string | null
    fetalGender?: string | null
    bullIatf?: string | null
    bodyConditionScore?: number | null
    observations?: string | null
    ownerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    dewormingDate?: Date | string | null
    dewormingExpiry?: Date | string | null
    dewormingName?: string | null
    status?: string
    vaccineDate?: Date | string | null
    vaccineExpiry?: Date | string | null
    vaccineName?: string | null
  }

  export type AnimalCreateManyFatherInput = {
    id?: string
    manualId: string
    gender: string
    birthDate: Date | string
    weight: number
    breed: string
    category?: string
    motherId?: string | null
    reproductiveStatus?: string | null
    handlingType?: string | null
    bullId?: string | null
    protocol?: string | null
    andrological?: string | null
    expectedDueDate?: Date | string | null
    fetalGender?: string | null
    bullIatf?: string | null
    bodyConditionScore?: number | null
    observations?: string | null
    ownerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    dewormingDate?: Date | string | null
    dewormingExpiry?: Date | string | null
    dewormingName?: string | null
    status?: string
    vaccineDate?: Date | string | null
    vaccineExpiry?: Date | string | null
    vaccineName?: string | null
  }

  export type AnimalCreateManyMotherInput = {
    id?: string
    manualId: string
    gender: string
    birthDate: Date | string
    weight: number
    breed: string
    category?: string
    fatherId?: string | null
    reproductiveStatus?: string | null
    handlingType?: string | null
    bullId?: string | null
    protocol?: string | null
    andrological?: string | null
    expectedDueDate?: Date | string | null
    fetalGender?: string | null
    bullIatf?: string | null
    bodyConditionScore?: number | null
    observations?: string | null
    ownerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    dewormingDate?: Date | string | null
    dewormingExpiry?: Date | string | null
    dewormingName?: string | null
    status?: string
    vaccineDate?: Date | string | null
    vaccineExpiry?: Date | string | null
    vaccineName?: string | null
  }

  export type DewormingCreateManyAnimalInput = {
    id?: string
    name: string
    date: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DiseaseCreateManyAnimalInput = {
    id?: string
    name: string
    description?: string | null
    date: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NotificationCreateManyAnimalInput = {
    id?: string
    message: string
    notifyAt: Date | string
    read?: boolean
    userId: string
    createdAt?: Date | string
  }

  export type VaccineCreateManyAnimalInput = {
    name: string
    description?: string | null
    date: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    expiryDate: Date | string
    id?: string
  }

  export type AnimalUpdateWithoutBullInput = {
    id?: StringFieldUpdateOperationsInput | string
    manualId?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    weight?: FloatFieldUpdateOperationsInput | number
    breed?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    reproductiveStatus?: NullableStringFieldUpdateOperationsInput | string | null
    handlingType?: NullableStringFieldUpdateOperationsInput | string | null
    protocol?: NullableStringFieldUpdateOperationsInput | string | null
    andrological?: NullableStringFieldUpdateOperationsInput | string | null
    expectedDueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fetalGender?: NullableStringFieldUpdateOperationsInput | string | null
    bullIatf?: NullableStringFieldUpdateOperationsInput | string | null
    bodyConditionScore?: NullableFloatFieldUpdateOperationsInput | number | null
    observations?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dewormingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dewormingExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dewormingName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    vaccineDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vaccineExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vaccineName?: NullableStringFieldUpdateOperationsInput | string | null
    offspringFromBull?: AnimalUpdateManyWithoutBullNestedInput
    father?: AnimalUpdateOneWithoutOffspringFromFatherNestedInput
    offspringFromFather?: AnimalUpdateManyWithoutFatherNestedInput
    mother?: AnimalUpdateOneWithoutOffspringFromMotherNestedInput
    offspringFromMother?: AnimalUpdateManyWithoutMotherNestedInput
    owner?: UserUpdateOneRequiredWithoutAnimalsNestedInput
    dewormings?: DewormingUpdateManyWithoutAnimalNestedInput
    diseases?: DiseaseUpdateManyWithoutAnimalNestedInput
    Notification?: NotificationUpdateManyWithoutAnimalNestedInput
    vaccines?: VaccineUpdateManyWithoutAnimalNestedInput
  }

  export type AnimalUncheckedUpdateWithoutBullInput = {
    id?: StringFieldUpdateOperationsInput | string
    manualId?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    weight?: FloatFieldUpdateOperationsInput | number
    breed?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    motherId?: NullableStringFieldUpdateOperationsInput | string | null
    fatherId?: NullableStringFieldUpdateOperationsInput | string | null
    reproductiveStatus?: NullableStringFieldUpdateOperationsInput | string | null
    handlingType?: NullableStringFieldUpdateOperationsInput | string | null
    protocol?: NullableStringFieldUpdateOperationsInput | string | null
    andrological?: NullableStringFieldUpdateOperationsInput | string | null
    expectedDueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fetalGender?: NullableStringFieldUpdateOperationsInput | string | null
    bullIatf?: NullableStringFieldUpdateOperationsInput | string | null
    bodyConditionScore?: NullableFloatFieldUpdateOperationsInput | number | null
    observations?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dewormingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dewormingExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dewormingName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    vaccineDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vaccineExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vaccineName?: NullableStringFieldUpdateOperationsInput | string | null
    offspringFromBull?: AnimalUncheckedUpdateManyWithoutBullNestedInput
    offspringFromFather?: AnimalUncheckedUpdateManyWithoutFatherNestedInput
    offspringFromMother?: AnimalUncheckedUpdateManyWithoutMotherNestedInput
    dewormings?: DewormingUncheckedUpdateManyWithoutAnimalNestedInput
    diseases?: DiseaseUncheckedUpdateManyWithoutAnimalNestedInput
    Notification?: NotificationUncheckedUpdateManyWithoutAnimalNestedInput
    vaccines?: VaccineUncheckedUpdateManyWithoutAnimalNestedInput
  }

  export type AnimalUncheckedUpdateManyWithoutBullInput = {
    id?: StringFieldUpdateOperationsInput | string
    manualId?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    weight?: FloatFieldUpdateOperationsInput | number
    breed?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    motherId?: NullableStringFieldUpdateOperationsInput | string | null
    fatherId?: NullableStringFieldUpdateOperationsInput | string | null
    reproductiveStatus?: NullableStringFieldUpdateOperationsInput | string | null
    handlingType?: NullableStringFieldUpdateOperationsInput | string | null
    protocol?: NullableStringFieldUpdateOperationsInput | string | null
    andrological?: NullableStringFieldUpdateOperationsInput | string | null
    expectedDueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fetalGender?: NullableStringFieldUpdateOperationsInput | string | null
    bullIatf?: NullableStringFieldUpdateOperationsInput | string | null
    bodyConditionScore?: NullableFloatFieldUpdateOperationsInput | number | null
    observations?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dewormingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dewormingExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dewormingName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    vaccineDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vaccineExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vaccineName?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AnimalUpdateWithoutFatherInput = {
    id?: StringFieldUpdateOperationsInput | string
    manualId?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    weight?: FloatFieldUpdateOperationsInput | number
    breed?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    reproductiveStatus?: NullableStringFieldUpdateOperationsInput | string | null
    handlingType?: NullableStringFieldUpdateOperationsInput | string | null
    protocol?: NullableStringFieldUpdateOperationsInput | string | null
    andrological?: NullableStringFieldUpdateOperationsInput | string | null
    expectedDueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fetalGender?: NullableStringFieldUpdateOperationsInput | string | null
    bullIatf?: NullableStringFieldUpdateOperationsInput | string | null
    bodyConditionScore?: NullableFloatFieldUpdateOperationsInput | number | null
    observations?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dewormingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dewormingExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dewormingName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    vaccineDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vaccineExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vaccineName?: NullableStringFieldUpdateOperationsInput | string | null
    bull?: AnimalUpdateOneWithoutOffspringFromBullNestedInput
    offspringFromBull?: AnimalUpdateManyWithoutBullNestedInput
    offspringFromFather?: AnimalUpdateManyWithoutFatherNestedInput
    mother?: AnimalUpdateOneWithoutOffspringFromMotherNestedInput
    offspringFromMother?: AnimalUpdateManyWithoutMotherNestedInput
    owner?: UserUpdateOneRequiredWithoutAnimalsNestedInput
    dewormings?: DewormingUpdateManyWithoutAnimalNestedInput
    diseases?: DiseaseUpdateManyWithoutAnimalNestedInput
    Notification?: NotificationUpdateManyWithoutAnimalNestedInput
    vaccines?: VaccineUpdateManyWithoutAnimalNestedInput
  }

  export type AnimalUncheckedUpdateWithoutFatherInput = {
    id?: StringFieldUpdateOperationsInput | string
    manualId?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    weight?: FloatFieldUpdateOperationsInput | number
    breed?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    motherId?: NullableStringFieldUpdateOperationsInput | string | null
    reproductiveStatus?: NullableStringFieldUpdateOperationsInput | string | null
    handlingType?: NullableStringFieldUpdateOperationsInput | string | null
    bullId?: NullableStringFieldUpdateOperationsInput | string | null
    protocol?: NullableStringFieldUpdateOperationsInput | string | null
    andrological?: NullableStringFieldUpdateOperationsInput | string | null
    expectedDueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fetalGender?: NullableStringFieldUpdateOperationsInput | string | null
    bullIatf?: NullableStringFieldUpdateOperationsInput | string | null
    bodyConditionScore?: NullableFloatFieldUpdateOperationsInput | number | null
    observations?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dewormingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dewormingExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dewormingName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    vaccineDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vaccineExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vaccineName?: NullableStringFieldUpdateOperationsInput | string | null
    offspringFromBull?: AnimalUncheckedUpdateManyWithoutBullNestedInput
    offspringFromFather?: AnimalUncheckedUpdateManyWithoutFatherNestedInput
    offspringFromMother?: AnimalUncheckedUpdateManyWithoutMotherNestedInput
    dewormings?: DewormingUncheckedUpdateManyWithoutAnimalNestedInput
    diseases?: DiseaseUncheckedUpdateManyWithoutAnimalNestedInput
    Notification?: NotificationUncheckedUpdateManyWithoutAnimalNestedInput
    vaccines?: VaccineUncheckedUpdateManyWithoutAnimalNestedInput
  }

  export type AnimalUncheckedUpdateManyWithoutFatherInput = {
    id?: StringFieldUpdateOperationsInput | string
    manualId?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    weight?: FloatFieldUpdateOperationsInput | number
    breed?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    motherId?: NullableStringFieldUpdateOperationsInput | string | null
    reproductiveStatus?: NullableStringFieldUpdateOperationsInput | string | null
    handlingType?: NullableStringFieldUpdateOperationsInput | string | null
    bullId?: NullableStringFieldUpdateOperationsInput | string | null
    protocol?: NullableStringFieldUpdateOperationsInput | string | null
    andrological?: NullableStringFieldUpdateOperationsInput | string | null
    expectedDueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fetalGender?: NullableStringFieldUpdateOperationsInput | string | null
    bullIatf?: NullableStringFieldUpdateOperationsInput | string | null
    bodyConditionScore?: NullableFloatFieldUpdateOperationsInput | number | null
    observations?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dewormingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dewormingExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dewormingName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    vaccineDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vaccineExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vaccineName?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AnimalUpdateWithoutMotherInput = {
    id?: StringFieldUpdateOperationsInput | string
    manualId?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    weight?: FloatFieldUpdateOperationsInput | number
    breed?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    reproductiveStatus?: NullableStringFieldUpdateOperationsInput | string | null
    handlingType?: NullableStringFieldUpdateOperationsInput | string | null
    protocol?: NullableStringFieldUpdateOperationsInput | string | null
    andrological?: NullableStringFieldUpdateOperationsInput | string | null
    expectedDueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fetalGender?: NullableStringFieldUpdateOperationsInput | string | null
    bullIatf?: NullableStringFieldUpdateOperationsInput | string | null
    bodyConditionScore?: NullableFloatFieldUpdateOperationsInput | number | null
    observations?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dewormingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dewormingExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dewormingName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    vaccineDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vaccineExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vaccineName?: NullableStringFieldUpdateOperationsInput | string | null
    bull?: AnimalUpdateOneWithoutOffspringFromBullNestedInput
    offspringFromBull?: AnimalUpdateManyWithoutBullNestedInput
    father?: AnimalUpdateOneWithoutOffspringFromFatherNestedInput
    offspringFromFather?: AnimalUpdateManyWithoutFatherNestedInput
    offspringFromMother?: AnimalUpdateManyWithoutMotherNestedInput
    owner?: UserUpdateOneRequiredWithoutAnimalsNestedInput
    dewormings?: DewormingUpdateManyWithoutAnimalNestedInput
    diseases?: DiseaseUpdateManyWithoutAnimalNestedInput
    Notification?: NotificationUpdateManyWithoutAnimalNestedInput
    vaccines?: VaccineUpdateManyWithoutAnimalNestedInput
  }

  export type AnimalUncheckedUpdateWithoutMotherInput = {
    id?: StringFieldUpdateOperationsInput | string
    manualId?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    weight?: FloatFieldUpdateOperationsInput | number
    breed?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    fatherId?: NullableStringFieldUpdateOperationsInput | string | null
    reproductiveStatus?: NullableStringFieldUpdateOperationsInput | string | null
    handlingType?: NullableStringFieldUpdateOperationsInput | string | null
    bullId?: NullableStringFieldUpdateOperationsInput | string | null
    protocol?: NullableStringFieldUpdateOperationsInput | string | null
    andrological?: NullableStringFieldUpdateOperationsInput | string | null
    expectedDueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fetalGender?: NullableStringFieldUpdateOperationsInput | string | null
    bullIatf?: NullableStringFieldUpdateOperationsInput | string | null
    bodyConditionScore?: NullableFloatFieldUpdateOperationsInput | number | null
    observations?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dewormingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dewormingExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dewormingName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    vaccineDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vaccineExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vaccineName?: NullableStringFieldUpdateOperationsInput | string | null
    offspringFromBull?: AnimalUncheckedUpdateManyWithoutBullNestedInput
    offspringFromFather?: AnimalUncheckedUpdateManyWithoutFatherNestedInput
    offspringFromMother?: AnimalUncheckedUpdateManyWithoutMotherNestedInput
    dewormings?: DewormingUncheckedUpdateManyWithoutAnimalNestedInput
    diseases?: DiseaseUncheckedUpdateManyWithoutAnimalNestedInput
    Notification?: NotificationUncheckedUpdateManyWithoutAnimalNestedInput
    vaccines?: VaccineUncheckedUpdateManyWithoutAnimalNestedInput
  }

  export type AnimalUncheckedUpdateManyWithoutMotherInput = {
    id?: StringFieldUpdateOperationsInput | string
    manualId?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    weight?: FloatFieldUpdateOperationsInput | number
    breed?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    fatherId?: NullableStringFieldUpdateOperationsInput | string | null
    reproductiveStatus?: NullableStringFieldUpdateOperationsInput | string | null
    handlingType?: NullableStringFieldUpdateOperationsInput | string | null
    bullId?: NullableStringFieldUpdateOperationsInput | string | null
    protocol?: NullableStringFieldUpdateOperationsInput | string | null
    andrological?: NullableStringFieldUpdateOperationsInput | string | null
    expectedDueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fetalGender?: NullableStringFieldUpdateOperationsInput | string | null
    bullIatf?: NullableStringFieldUpdateOperationsInput | string | null
    bodyConditionScore?: NullableFloatFieldUpdateOperationsInput | number | null
    observations?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dewormingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dewormingExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dewormingName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    vaccineDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vaccineExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vaccineName?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DewormingUpdateWithoutAnimalInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DewormingUncheckedUpdateWithoutAnimalInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DewormingUncheckedUpdateManyWithoutAnimalInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DiseaseUpdateWithoutAnimalInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DiseaseUncheckedUpdateWithoutAnimalInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DiseaseUncheckedUpdateManyWithoutAnimalInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUpdateWithoutAnimalInput = {
    id?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    notifyAt?: DateTimeFieldUpdateOperationsInput | Date | string
    read?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    User?: UserUpdateOneRequiredWithoutNotificationNestedInput
  }

  export type NotificationUncheckedUpdateWithoutAnimalInput = {
    id?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    notifyAt?: DateTimeFieldUpdateOperationsInput | Date | string
    read?: BoolFieldUpdateOperationsInput | boolean
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyWithoutAnimalInput = {
    id?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    notifyAt?: DateTimeFieldUpdateOperationsInput | Date | string
    read?: BoolFieldUpdateOperationsInput | boolean
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VaccineUpdateWithoutAnimalInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiryDate?: DateTimeFieldUpdateOperationsInput | Date | string
    id?: StringFieldUpdateOperationsInput | string
  }

  export type VaccineUncheckedUpdateWithoutAnimalInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiryDate?: DateTimeFieldUpdateOperationsInput | Date | string
    id?: StringFieldUpdateOperationsInput | string
  }

  export type VaccineUncheckedUpdateManyWithoutAnimalInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiryDate?: DateTimeFieldUpdateOperationsInput | Date | string
    id?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}