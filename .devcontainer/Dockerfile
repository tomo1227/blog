FROM debian:bookworm

ARG USERNAME=vscode
ARG USER_UID=1000
ARG USER_GID=$USER_UID

ENV DEBIAN_FRONTEND=noninteractive

RUN groupadd --gid $USER_GID $USERNAME \
    && useradd --uid $USER_UID --gid $USER_GID -m $USERNAME \
    && apt-get update \
    && apt-get install -y \
        sudo \
        bash-completion \
        wget \
        make \
        curl \
        openssh-client \
        locales \
        vim \
        xdg-utils \
        unzip \
        libnspr4 \
        libnss3 \
        libatk1.0-0 \
        libatk-bridge2.0-0 \
        libcups2 \
        libxkbcommon0 \
        libatspi2.0-0 \
        libxdamage1 \
        libcairo2 \
        libpango-1.0-0 \
        libasound2 \
    && rm -rf /var/lib/apt/lists/* \
    && echo "$USERNAME ALL=(root) NOPASSWD:ALL" > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME

RUN chsh --shell /bin/bash ${USERNAME}
RUN chmod +x /usr/local/bin/
RUN chown -R $USERNAME:$USERNAME /bin \
    && chmod -R 775 /bin \
    && chown -R $USERNAME:$USERNAME /usr/local/bin \
    && chmod -R 775 /usr/local/bin

RUN echo 'export PS1="\[\033[0;32m\]\u\[\033[0m\] ➜ \[\033[1;34m\]\w\[\033[0m\] \$(if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then echo \"(\[\033[1;31m\]\$(git rev-parse --abbrev-ref HEAD)\[\033[0m\])\"; fi)\$ "' >> /home/$USERNAME/.bashrc

RUN echo "ja_JP.UTF-8 UTF-8" > /etc/locale.gen && \
    locale-gen ja_JP.UTF-8 && \
    dpkg-reconfigure locales && \
    /usr/sbin/update-locale LANG=ja_JP.UTF-8

USER $USERNAME
RUN curl -fsSL https://bun.sh/install | bash
RUN echo "export PATH=\"/home/${USERNAME}/.bun/bin:\$PATH\"" >> /home/${USERNAME}/.bashrc
RUN export PATH="/home/$USERNAME/.bun/bin:$PATH"

SHELL ["/bin/bash", "-c"]
CMD ["/bin/bash"]
RUN source /home/${USERNAME}/.bashrc

WORKDIR /workspace
