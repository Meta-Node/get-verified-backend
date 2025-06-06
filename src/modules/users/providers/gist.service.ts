import { Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { firstValueFrom } from 'rxjs'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class GistService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  private readonly githubApiUrl = 'https://api.github.com/gists'

  async createGist(
    content: string,
    filename: string,
    description: string,
    isPublic: boolean,
  ) {
    const token = this.configService.getOrThrow('GITHUB_ACCESS_TOKEN')
    const url = this.githubApiUrl
    const headers = { Authorization: `token ${token}` }
    const body = {
      description,
      public: isPublic,
      files: { [filename]: { content } },
    }

    const response = await firstValueFrom(
      this.httpService.post(url, body, { headers }),
    )
    return response.data
  }

  async getGist(gistId: string) {
    const token = this.configService.getOrThrow('GITHUB_ACCESS_TOKEN')

    const url = `${this.githubApiUrl}/${gistId}`
    const headers = { Authorization: `token ${token}` }

    const response = await firstValueFrom(
      this.httpService.get(url, { headers }),
    )
    return response.data
  }
}
