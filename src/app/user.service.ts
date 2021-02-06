import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserLogService } from './user-log.service';
import { User } from './user.model';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl = 'api/users';

  constructor(
    private httpService: HttpClient,
    private userLogService: UserLogService 
  ) { }

  private logUserDetail(user: User) {
    this.userLogService.logMyDetail(user);
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  private handleError<T>(operation: string = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.userLogService.logError(result || [], operation, error.message);
      return of(result as T);
    }
  }

  // User's CRUD operations

  /**
   * Get the List of Users
   */
  getUsers(): Observable<User[]> {
    return this.httpService.get<User []>(this.usersUrl)
      .pipe(
        tap(_ => this.userLogService.log('Getting Users ...')),
        catchError(
          this.handleError<User []>('getUsers', [])
        )
      )
  }

  /**
   * Get a Single User
   * @param {String} id - Id of the user
   */
  getUser(id: string): Observable<User> {
    const url = `${this.usersUrl}/${id}`;
    return this.httpService.get<User>(url)
      .pipe(
        tap(_ => this.userLogService.log('Getting Single User ...')),
        catchError(
          this.handleError<any>(`getUser id=${id}`)
        )
      )
  }

  /**
   * Update a single user info
   * @param {Object} user : User Object
   */
  updateUser(user: User): Observable<any> {
    return this.httpService.put(this.usersUrl, user, this.httpOptions)
      .pipe(
        tap(_ => this.userLogService.log('Updating Single User\'s detail ...')),
        catchError(
          this.handleError<any>('updateUser')
        )
      )
  }

  /**
   * Add a single user
   * @param {Object} user - User Object
   */
  addUser(user: User): Observable<User> {
    return this.httpService.post<User>(this.usersUrl, user, this.httpOptions)
      .pipe(
        tap(_ => this.userLogService.log('Adding Single User ...')),
        tap(_ => this.logUserDetail(user)),
        catchError(
          this.handleError<any>('addUser')
        )
      )
  }

  /**
   * Delete a Single User
   * @param {String} id - Id of the user
   */
  deleteUser(id: string): Observable<User> {
    const url = `${this.usersUrl}/${id}`;
    return this.httpService.delete<User>(url, this.httpOptions)
      .pipe(
        tap(_ => this.userLogService.log('Deleting Single User ...')),
        catchError(
          this.handleError<any>('deleteUser')
        )
      )
  }

}
