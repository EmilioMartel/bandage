# Etapa 1: builder (Alpine para menor tamaño)
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: build + ejecución usando Debian Bookworm
FROM node:22-bookworm-slim

# Argumento para detectar arquitectura durante el build
ARG TARGETARCH

# Instalar dependencias básicas y herramientas
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    git \
    qt6-base-dev \
    qt6-base-dev-tools \
    qt6-svg-dev \
    libgl1-mesa-dev \
    pkg-config \
    libboost-all-dev \
    libgtest-dev \
    wget \
    ca-certificates \
    unzip \
    curl && \
    rm -rf /var/lib/apt/lists/*

# Instalar CMake >= 3.28 manualmente, eligiendo el binario correcto según TARGETARCH
WORKDIR /tmp
RUN if [ "$TARGETARCH" = "amd64" ]; then \
      CMK_URL="https://github.com/Kitware/CMake/releases/download/v3.28.3/cmake-3.28.3-linux-x86_64.sh"; \
    else \
      CMK_URL="https://github.com/Kitware/CMake/releases/download/v3.28.3/cmake-3.28.3-linux-aarch64.sh"; \
    fi && \
    curl -LO ${CMK_URL} && \
    chmod +x cmake-3.28.3-linux-*.sh && \
    ./cmake-3.28.3-linux-*.sh --skip-license --prefix=/usr/local && \
    rm cmake-3.28.3-linux-*.sh

# Clonar y compilar BandageNG
WORKDIR /opt
RUN git clone --depth 1 https://github.com/asl/BandageNG.git && \
    mkdir BandageNG/build && cd BandageNG/build && \
    cmake .. -DCMAKE_BUILD_TYPE=Release && \
    make -j$(nproc) && \
    make install

# Enlace al binario
RUN ln -s /usr/local/bin/BandageNG /usr/local/bin/bandage

# Configurar backend Node.js
WORKDIR /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
RUN npm install --omit=dev

# PATH y puerto
ENV PATH="/usr/local/bin:$PATH"
EXPOSE 3000
CMD ["node", "dist/server.js"]
